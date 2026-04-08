"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWealthStore } from "@/hooks/use-wealth-store";
import { formatKRW } from "@/lib/utils";
import { getNextLevelTarget, STRATEGIES } from "@/lib/wealth";

export default function ResultPage() {
  const { state } = useWealthStore();
  const strategy = STRATEGIES[state.level as keyof typeof STRATEGIES];
  const target = getNextLevelTarget(state.netWorth);

  return (
    <div className="page-grid">
      <Card className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-secondaryText">Result</p>
          <h1 className="mt-2 text-4xl font-semibold">You are Level {state.level}</h1>
          <p className="mt-2 text-secondaryText">Net worth: {formatKRW(state.netWorth)}</p>
          <p className="text-secondaryText">Next level target: {target ? formatKRW(target) : "Top level achieved"}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold text-accent">Strategy</p>
            <ul className="mt-3 space-y-2 text-sm text-secondaryText">
              {strategy.keyStrategy.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-rose-300">What NOT to do</p>
            <ul className="mt-3 space-y-2 text-sm text-secondaryText">
              {strategy.avoidStrategy.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </Card>
        </div>

        <Card>
          <p className="text-sm font-semibold">Recommended actions</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {state.actions.slice(0, 5).map((action) => (
              <li key={action.id}>• {action.title}</li>
            ))}
          </ul>
        </Card>

        <Link href="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
}
