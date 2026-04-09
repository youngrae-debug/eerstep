"use client";

import { Card } from "@/components/ui/card";
import { useCopy } from "@/hooks/use-locale";
import { useWealthStore } from "@/hooks/use-wealth-store";
import { getStrategy, type WealthLevel } from "@/lib/wealth";

export default function StrategyPage() {
  const { copy, locale } = useCopy();
  const { state } = useWealthStore();
  const current = getStrategy(state.level as WealthLevel, locale);
  const nextLevel = Math.min(state.level + 1, 6) as WealthLevel;
  const next = getStrategy(nextLevel, locale);

  return (
    <div className="page-grid">
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.strategyPage.currentState}</p>
        <h1 className="mt-2 text-3xl font-semibold">
          {locale === "ko" ? `레벨 ${state.level} 전략` : `Level ${state.level} Strategy`}
        </h1>
        <p className="mt-2 text-secondaryText">{current.explanation}</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm font-semibold text-accent">{copy.strategyPage.keyStrategy}</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {current.keyStrategy.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-rose-300">{copy.strategyPage.avoidStrategy}</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {current.avoidStrategy.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.strategyPage.nextAction}</p>
        <h2 className="mt-2 text-xl font-semibold">
          {locale === "ko" ? `레벨 ${nextLevel} ${copy.strategyPage.preview}` : `${copy.strategyPage.preview} of Level ${nextLevel}`}
        </h2>
        <p className="mt-2 text-sm text-secondaryText">{next.headline}</p>
      </Card>
    </div>
  );
}
