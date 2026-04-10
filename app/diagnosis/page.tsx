"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCopy } from "@/hooks/use-locale";
import { useWealthStore } from "@/hooks/use-wealth-store";
import { formatInputAmount, toBaseCurrencyAmount } from "@/lib/utils";
import type { Bottleneck } from "@/lib/wealth";

export default function DiagnosisPage() {
  const router = useRouter();
  const { copy, locale } = useCopy();
  const { state, updateFinancials } = useWealthStore();
  const [form, setForm] = useState({
    assets: formatInputAmount(state.assets, locale),
    liabilities: formatInputAmount(state.liabilities, locale),
    income: formatInputAmount(state.income, locale),
    expenses: formatInputAmount(state.expenses, locale),
    bottleneck: state.bottleneck
  });

  useEffect(() => {
    setForm({
      assets: formatInputAmount(state.assets, locale),
      liabilities: formatInputAmount(state.liabilities, locale),
      income: formatInputAmount(state.income, locale),
      expenses: formatInputAmount(state.expenses, locale),
      bottleneck: state.bottleneck
    });
  }, [locale, state.assets, state.liabilities, state.income, state.expenses, state.bottleneck]);

  const parseAmount = (value: string) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return 0;
    return Math.max(Math.round(toBaseCurrencyAmount(parsed, locale)), 0);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFinancials({
      assets: parseAmount(form.assets),
      liabilities: parseAmount(form.liabilities),
      income: parseAmount(form.income),
      expenses: parseAmount(form.expenses),
      bottleneck: form.bottleneck
    });
    router.push("/result");
  };

  return (
    <div className="page-grid">
      <Card className="mx-auto w-full max-w-xl">
        <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.diagnosis.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold">{copy.diagnosis.title}</h1>
        <p className="mt-2 text-sm text-secondaryText">{copy.diagnosis.description}</p>

        <Card className="mt-6 space-y-3 border-white/5 bg-white/[0.03]">
          <p className="text-sm font-semibold text-primaryText">{copy.diagnosis.guideTitle}</p>
          <div className="space-y-2 text-sm leading-6 text-secondaryText">
            <p>{copy.diagnosis.assetsHelp}</p>
            <p>{copy.diagnosis.liabilitiesHelp}</p>
            <p>{copy.diagnosis.incomeHelp}</p>
            <p>{copy.diagnosis.expensesHelp}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-secondaryText">
            <p>{copy.diagnosis.currencyNote}</p>
            <p className="mt-1">{copy.diagnosis.reassurance}</p>
          </div>
        </Card>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {[
            ["assets", copy.diagnosis.assets],
            ["liabilities", copy.diagnosis.liabilities],
            ["income", copy.diagnosis.income],
            ["expenses", copy.diagnosis.expenses]
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

          <fieldset className="space-y-2">
            <p className="text-sm font-semibold text-primaryText">{copy.diagnosis.bottleneckTitle}</p>
            <p className="text-xs text-secondaryText">{copy.diagnosis.bottleneckDescription}</p>
            <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={copy.diagnosis.bottleneckTitle}>
              {([
                ["income", copy.diagnosis.bottleneckIncome],
                ["spending", copy.diagnosis.bottleneckSpending],
                ["debt", copy.diagnosis.bottleneckDebt],
                ["investing", copy.diagnosis.bottleneckInvesting],
                ["strategy", copy.diagnosis.bottleneckStrategy],
                ["execution", copy.diagnosis.bottleneckExecution],
                ["sales", copy.diagnosis.bottleneckSales]
              ] as [Bottleneck, string][]).map(([value, label]) => {
                const checked = form.bottleneck === value;
                return (
                  <label
                    key={value}
                    className={
                      checked
                        ? "cursor-pointer rounded-xl border border-accent bg-accent/10 px-3 py-2 text-left text-sm text-primaryText"
                        : "cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-secondaryText"
                    }
                  >
                    <input
                      type="radio"
                      name="bottleneck"
                      value={value}
                      checked={checked}
                      onChange={() => setForm((prev) => ({ ...prev, bottleneck: value }))}
                      className="sr-only"
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <Button type="submit" className="w-full" size="lg">
            {copy.diagnosis.submit}
          </Button>
        </form>
      </Card>
    </div>
  );
}
