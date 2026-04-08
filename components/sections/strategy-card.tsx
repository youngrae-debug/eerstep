import { Card } from "@/components/ui/card";
import { STRATEGIES, type WealthLevel } from "@/lib/wealth";

export function StrategyCard({ level }: { level: number }) {
  const strategy = STRATEGIES[level as WealthLevel];

  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-secondaryText">Strategy</p>
      <h3 className="mt-2 text-xl font-semibold">{strategy.headline}</h3>
      <p className="mt-2 text-sm text-secondaryText">{strategy.explanation}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-accent">Do this</p>
          <ul className="space-y-1 text-sm text-secondaryText">
            {strategy.keyStrategy.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-rose-300">Avoid this</p>
          <ul className="space-y-1 text-sm text-secondaryText">
            {strategy.avoidStrategy.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
