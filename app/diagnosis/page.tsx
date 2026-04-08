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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFinancials({
      assets: Number(form.assets || 0),
      liabilities: Number(form.liabilities || 0),
      income: Number(form.income || 0),
      expenses: Number(form.expenses || 0)
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
