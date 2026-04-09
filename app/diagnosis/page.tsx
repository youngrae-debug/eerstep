"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWealthStore } from "@/hooks/use-wealth-store";

export default function DiagnosisPage() {
  const router = useRouter();
  const { state, updateFinancials } = useWealthStore();
  const [form, setForm] = useState({
    assets: state.assets.toString(),
    liabilities: state.liabilities.toString(),
    income: state.income.toString(),
    expenses: state.expenses.toString()
  });

  const parseAmount = (value: string) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return 0;
    return Math.max(parsed, 0);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFinancials({
      assets: parseAmount(form.assets),
      liabilities: parseAmount(form.liabilities),
      income: parseAmount(form.income),
      expenses: parseAmount(form.expenses)
    });
    router.push("/result");
  };

  return (
    <div className="page-grid">
      <Card className="mx-auto w-full max-w-xl">
        <p className="text-xs uppercase tracking-wide text-secondaryText">Diagnosis</p>
        <h1 className="mt-2 text-3xl font-semibold">Where are you now?</h1>
        <p className="mt-2 text-sm text-secondaryText">Enter four numbers. We&apos;ll return your level, strategy, and next actions.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {[
            ["assets", "Total assets (KRW)"],
            ["liabilities", "Total liabilities (KRW)"],
            ["income", "Monthly income (KRW)"],
            ["expenses", "Monthly expenses (KRW)"]
          ].map(([key, label]) => (
            <div className="space-y-2" key={key}>
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                type="number"
                min={0}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                required
              />
            </div>
          ))}
          <Button type="submit" className="w-full" size="lg">
            Analyze my level
          </Button>
        </form>
      </Card>
    </div>
  );
}
