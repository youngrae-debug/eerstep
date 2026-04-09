"use client";

import { Card } from "@/components/ui/card";
import { useCopy } from "@/hooks/use-locale";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { getNextLevelTarget, progressToNextLevel } from "@/lib/wealth";

export function ProgressCard({ netWorth }: { netWorth: number }) {
  const { copy, locale } = useCopy();
  const progress = progressToNextLevel(netWorth);
  const target = getNextLevelTarget(netWorth);

  return (
    <Card>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.sections.progressToNextLevel}</p>
          <p className="mt-2 text-xl font-semibold">
            {target ? formatCurrency(target, locale) : copy.sections.topLevelReached}
          </p>
        </div>
        <span className="text-sm text-secondaryText">{formatPercent(progress, locale)}</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-accent" style={{ width: `${progress * 100}%` }} />
      </div>
    </Card>
  );
}
