"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { useCopy } from "@/hooks/use-locale";
import { getMockNetWorthHistory } from "@/lib/mock";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";

export function NetWorthChart() {
  const { copy, locale } = useCopy();
  const chartData = getMockNetWorthHistory(locale);

  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.sections.trendMock}</p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="month" stroke="#A1A1AA" tickLine={false} axisLine={false} />
            <YAxis
              stroke="#A1A1AA"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatCompactNumber(v, locale)}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#15151C", border: "1px solid rgba(255,255,255,0.1)" }}
              formatter={(v: number) => formatCurrency(v, locale)}
            />
            <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
