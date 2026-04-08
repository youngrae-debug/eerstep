"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { formatKRW } from "@/lib/utils";
import { mockNetWorthHistory } from "@/lib/mock";

export function NetWorthChart() {
  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-secondaryText">Trend (mock)</p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockNetWorthHistory}>
            <XAxis dataKey="month" stroke="#A1A1AA" tickLine={false} axisLine={false} />
            <YAxis
              stroke="#A1A1AA"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${Math.round(v / 1_000_000)}M`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#15151C", border: "1px solid rgba(255,255,255,0.1)" }}
              formatter={(v: number) => formatKRW(v)}
            />
            <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
