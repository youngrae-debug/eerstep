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

type ActionItem = {
  id: string;
  title: string;
  completed: boolean;
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

const defaultState: WealthState = {
  assets: 50_000_000,
  liabilities: 20_000_000,
  income: 6_000_000,
  expenses: 3_200_000,
  netWorth: 30_000_000,
  level: 2,
  actions: generateActions(2).map((title, index) => ({ id: `seed-${index}`, title, completed: false }))
};

function parseFiniteNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function toSafeMoney(value: unknown): number {
  return Math.max(parseFiniteNumber(value), 0);
}

function toSafeActionItem(value: unknown, index: number): ActionItem | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<ActionItem>;
  if (typeof raw.title !== "string" || !raw.title.trim()) return null;

  return {
    id:
      typeof raw.id === "string" && raw.id.trim()
        ? raw.id
        : globalThis.crypto?.randomUUID?.() ?? `restored-${Date.now()}-${index}`,
    title: raw.title.trim(),
    completed: Boolean(raw.completed)
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

  const restoredActions = Array.isArray(raw.actions)
    ? raw.actions
        .map((action, index) => toSafeActionItem(action, index))
        .filter((action): action is ActionItem => action !== null)
    : [];

  return {
    assets,
    liabilities,
    income,
    expenses,
    netWorth,
    level,
    actions:
      restoredActions.length > 0
        ? restoredActions
        : generateActions(level).map((title, index) => ({ id: `seed-${index}`, title, completed: false }))
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
          actions: generateActions(level).map((title, index) => ({ id: `${Date.now()}-${index}`, title, completed: false }))
        }));
      },
      addAction: (title) => {
        if (!title.trim()) return;
        setState((prev) => ({
          ...prev,
          actions: [
            ...prev.actions,
            {
              id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
              title: title.trim(),
              completed: false
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
