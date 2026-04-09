"use client";

import { Card } from "@/components/ui/card";
import { useCopy } from "@/hooks/use-locale";
import { formatCurrency } from "@/lib/utils";
import { dailySpendRule, onePercentRule } from "@/lib/wealth";

type Props = {
  netWorth: number;
  level: number;
};

export function WealthSummary({ netWorth, level }: Props) {
  const { copy, locale } = useCopy();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.sections.currentState}</p>
        <p className="mt-2 text-3xl font-semibold">{locale === "ko" ? `레벨 ${level}` : `Level ${level}`}</p>
        <p className="mt-1 text-sm text-secondaryText">
          {locale === "ko" ? `순자산 ${formatCurrency(netWorth, locale)}` : `Net worth ${formatCurrency(netWorth, locale)}`}
        </p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.sections.onePercentRule}</p>
        <p className="mt-2 text-2xl font-semibold text-accent">{formatCurrency(onePercentRule(netWorth), locale)}</p>
        <p className="mt-1 text-sm text-secondaryText">{copy.sections.onePercentDescription}</p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.sections.dailySpendRule}</p>
        <p className="mt-2 text-2xl font-semibold text-accent">{formatCurrency(dailySpendRule(netWorth), locale)}</p>
        <p className="mt-1 text-sm text-secondaryText">{copy.sections.dailySpendDescription}</p>
      </Card>
    </div>
  );
}
