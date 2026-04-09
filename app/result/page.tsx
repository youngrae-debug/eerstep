"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCopy } from "@/hooks/use-locale";
import { useWealthStore } from "@/hooks/use-wealth-store";
import { formatCurrency } from "@/lib/utils";
import { getActionDisplayTitle, getNextLevelTarget, getStrategy } from "@/lib/wealth";

export default function ResultPage() {
  const { copy, locale } = useCopy();
  const { state } = useWealthStore();
  const strategy = getStrategy(state.level, locale);
  const target = getNextLevelTarget(state.netWorth);

  return (
    <div className="page-grid">
      <Card className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.result.eyebrow}</p>
          <h1 className="mt-2 text-4xl font-semibold">
            {locale === "ko" ? `당신은 레벨 ${state.level}입니다` : `You are Level ${state.level}`}
          </h1>
          <p className="mt-2 text-secondaryText">{copy.result.netWorth}: {formatCurrency(state.netWorth, locale)}</p>
          <p className="text-secondaryText">
            {copy.result.nextLevelTarget}: {target ? formatCurrency(target, locale) : copy.result.topLevelAchieved}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold text-accent">{copy.result.strategyTitle}</p>
            <ul className="mt-3 space-y-2 text-sm text-secondaryText">
              {strategy.keyStrategy.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-rose-300">{copy.result.avoidTitle}</p>
            <ul className="mt-3 space-y-2 text-sm text-secondaryText">
              {strategy.avoidStrategy.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </Card>
        </div>

        <Card>
          <p className="text-sm font-semibold">{copy.result.recommendedActions}</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {state.actions.slice(0, 5).map((action) => (
              <li key={action.id}>• {getActionDisplayTitle(action, locale)}</li>
            ))}
          </ul>
        </Card>

        <Link href="/dashboard">
          <Button size="lg">{copy.result.cta}</Button>
        </Link>
      </Card>
    </div>
  );
}
