import { Card } from "@/components/ui/card";
import { formatKRW } from "@/lib/utils";
import { dailySpendRule, onePercentRule } from "@/lib/wealth";

type Props = {
  netWorth: number;
  level: number;
};

export function WealthSummary({ netWorth, level }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">Current state</p>
        <p className="mt-2 text-3xl font-semibold">Level {level}</p>
        <p className="mt-1 text-sm text-secondaryText">Net worth {formatKRW(netWorth)}</p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">1% Rule</p>
        <p className="mt-2 text-2xl font-semibold text-accent">{formatKRW(onePercentRule(netWorth))}</p>
        <p className="mt-1 text-sm text-secondaryText">
          Do not spend time on tasks that cannot increase your net worth by this amount.
        </p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">0.01% Rule</p>
        <p className="mt-2 text-2xl font-semibold text-accent">{formatKRW(dailySpendRule(netWorth))}</p>
        <p className="mt-1 text-sm text-secondaryText">This is your daily guilt-free spending.</p>
      </Card>
    </div>
  );
}
