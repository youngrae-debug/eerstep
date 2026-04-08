"use client";

import { Card } from "@/components/ui/card";
import { useWealthStore } from "@/hooks/use-wealth-store";
import { STRATEGIES, type WealthLevel } from "@/lib/wealth";

export default function StrategyPage() {
  const { state } = useWealthStore();
  const current = STRATEGIES[state.level as WealthLevel];
  const nextLevel = Math.min(state.level + 1, 6) as WealthLevel;
  const next = STRATEGIES[nextLevel];

  return (
    <div className="page-grid">
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">Current state</p>
        <h1 className="mt-2 text-3xl font-semibold">Level {state.level} Strategy</h1>
        <p className="mt-2 text-secondaryText">{current.explanation}</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm font-semibold text-accent">Key strategy</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {current.keyStrategy.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-rose-300">Avoid strategy</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {current.avoidStrategy.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">Next action</p>
        <h2 className="mt-2 text-xl font-semibold">Preview of Level {nextLevel}</h2>
        <p className="mt-2 text-sm text-secondaryText">{next.headline}</p>
      </Card>
    </div>
  );
}
