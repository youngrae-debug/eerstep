"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { generateActions, getWealthLevel, type WealthLevel } from "@/lib/wealth";

type ActionSource = "generated" | "custom";

type ActionItem = {
  id: string;
  title: string;
  completed: boolean;
  source: ActionSource;
};

type WealthState = {
  assets: number;
  liabilities: number;
  income: number;
  expenses: number;
  netWorth: number;
  level: number;
  actions: ActionItem[];
};

type WealthContextValue = {
  state: WealthState;
  updateFinancials: (payload: { assets: number; liabilities: number; income: number; expenses: number }) => void;
  addAction: (title: string) => void;
  toggleAction: (id: string) => void;
};

const STORAGE_KEY = "eerstep-store";

function createActionId(prefix: string, index?: number) {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${prefix}-${Date.now()}${index === undefined ? "" : `-${index}`}-${Math.random().toString(16).slice(2)}`
  );
}

function createGeneratedActions(level: WealthLevel, prefix = "generated") {
  return generateActions(level).map((title, index) => ({
    id: createActionId(prefix, index),
    title,
    completed: false,
    source: "generated" as const
  }));
}

const defaultState: WealthState = {
  assets: 50_000_000,
  liabilities: 20_000_000,
  income: 6_000_000,
  expenses: 3_200_000,
  netWorth: 30_000_000,
  level: 2,
  actions: createGeneratedActions(2, "seed")
};

function parseFiniteNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function toSafeMoney(value: unknown): number {
  return Math.max(parseFiniteNumber(value), 0);
}

function toSafeActionItem(value: unknown, index: number, generatedTitles: Set<string>): ActionItem | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<ActionItem>;
  if (typeof raw.title !== "string" || !raw.title.trim()) return null;

  const title = raw.title.trim();
  const source: ActionSource =
    raw.source === "generated" || raw.source === "custom"
      ? raw.source
      : generatedTitles.has(title)
        ? "generated"
        : "custom";

  return {
    id: typeof raw.id === "string" && raw.id.trim() ? raw.id : createActionId("restored", index),
    title,
    completed: Boolean(raw.completed),
    source
  };
}

function sanitizeStoredState(value: unknown): WealthState {
  if (!value || typeof value !== "object") return defaultState;

  const raw = value as Partial<WealthState>;
  const assets = toSafeMoney(raw.assets);
  const liabilities = toSafeMoney(raw.liabilities);
  const income = toSafeMoney(raw.income);
  const expenses = toSafeMoney(raw.expenses);
  const netWorth = assets - liabilities;
  const level = getWealthLevel(netWorth) as WealthLevel;
  const generatedTitles = new Set(generateActions(level));

  const restoredActions = Array.isArray(raw.actions)
    ? raw.actions
        .map((action, index) => toSafeActionItem(action, index, generatedTitles))
        .filter((action): action is ActionItem => action !== null)
    : [];
  const generatedActions = restoredActions.filter((action) => action.source === "generated");
  const customActions = restoredActions.filter((action) => action.source === "custom");

  return {
    assets,
    liabilities,
    income,
    expenses,
    netWorth,
    level,
    actions:
      restoredActions.length > 0
        ? [...generatedActions, ...customActions]
        : createGeneratedActions(level, "seed")
  };
}

const WealthContext = createContext<WealthContextValue | null>(null);

export function WealthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WealthState>(defaultState);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setState(sanitizeStoredState(JSON.parse(raw)));
      } catch {
        setState(defaultState);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<WealthContextValue>(
    () => ({
      state,
      updateFinancials: ({ assets, liabilities, income, expenses }) => {
        const netWorth = assets - liabilities;
        const level = getWealthLevel(netWorth);
        setState((prev) => ({
          ...prev,
          assets,
          liabilities,
          income,
          expenses,
          netWorth,
          level,
          actions: [
            ...(() => {
              if (prev.level === level) {
                const preservedGenerated = prev.actions.filter((action) => action.source === "generated");
                return preservedGenerated.length > 0 ? preservedGenerated : createGeneratedActions(level);
              }

              return createGeneratedActions(level, `level-${level}`);
            })(),
            ...prev.actions.filter((action) => action.source === "custom")
          ]
        }));
      },
      addAction: (title) => {
        if (!title.trim()) return;
        setState((prev) => ({
          ...prev,
          actions: [
            ...prev.actions,
            {
              id: createActionId("custom"),
              title: title.trim(),
              completed: false,
              source: "custom"
            }
          ]
        }));
      },
      toggleAction: (id) => {
        setState((prev) => ({
          ...prev,
          actions: prev.actions.map((action) =>
            action.id === id ? { ...action, completed: !action.completed } : action
          )
        }));
      }
    }),
    [state]
  );

  return <WealthContext.Provider value={value}>{children}</WealthContext.Provider>;
}

export function useWealthStore() {
  const context = useContext(WealthContext);
  if (!context) {
    throw new Error("useWealthStore must be used within WealthProvider");
  }
  return context;
}
