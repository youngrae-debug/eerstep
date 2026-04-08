"use client";

import { ActionChecklist } from "@/components/sections/action-checklist";
import { NetWorthChart } from "@/components/sections/networth-chart";
import { ProgressCard } from "@/components/sections/progress-card";
import { StrategyCard } from "@/components/sections/strategy-card";
import { WealthSummary } from "@/components/sections/wealth-summary";
import { useWealthStore } from "@/hooks/use-wealth-store";

export default function DashboardPage() {
  const { state } = useWealthStore();

  return (
    <div className="page-grid">
      <WealthSummary netWorth={state.netWorth} level={state.level} />
      <ProgressCard netWorth={state.netWorth} />
      <NetWorthChart />
      <StrategyCard level={state.level} />
      <ActionChecklist />
    </div>
  );
}
