"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-locale";
import { useWealthStore } from "@/hooks/use-wealth-store";
import { trackEvent } from "@/lib/analytics";

export default function ValidationPage() {
  const { copy } = useCopy();
  const { state, addValidationRun } = useWealthStore();
  const initialRunsRef = useRef(state.validationRuns.length);
  const [form, setForm] = useState({
    problem: "",
    customer: "",
    channel: "",
    attempts: "10",
    responses: "0",
    note: ""
  });

  useEffect(() => {
    trackEvent("validation_started", {
      source: "validation_page_view",
      existingRuns: initialRunsRef.current
    });
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addValidationRun({
      problem: form.problem,
      customer: form.customer,
      channel: form.channel,
      attempts: Number(form.attempts),
      responses: Number(form.responses),
      note: form.note
    });
    trackEvent("validation_saved", {
      problem: form.problem,
      customer: form.customer,
      channel: form.channel,
      attempts: Number(form.attempts),
      responses: Number(form.responses)
    });
    if (Number(form.responses) > 0) {
      trackEvent("first_response_recorded", {
        problem: form.problem,
        responses: Number(form.responses)
      });
    }
    setForm({
      problem: "",
      customer: "",
      channel: "",
      attempts: "10",
      responses: "0",
      note: ""
    });
  };

  return (
    <div className="page-grid">
      <Card className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.validationPage.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold">{copy.validationPage.title}</h1>
          <p className="mt-2 text-sm text-secondaryText">{copy.validationPage.description}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="problem">{copy.validationPage.problem}</Label>
            <Input
              id="problem"
              value={form.problem}
              onChange={(e) => setForm((prev) => ({ ...prev, problem: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer">{copy.validationPage.customer}</Label>
            <Input
              id="customer"
              value={form.customer}
              onChange={(e) => setForm((prev) => ({ ...prev, customer: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="channel">{copy.validationPage.channel}</Label>
            <Input
              id="channel"
              value={form.channel}
              onChange={(e) => setForm((prev) => ({ ...prev, channel: e.target.value }))}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="attempts">{copy.validationPage.attempts}</Label>
              <Input
                id="attempts"
                type="number"
                min={0}
                value={form.attempts}
                onChange={(e) => setForm((prev) => ({ ...prev, attempts: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responses">{copy.validationPage.responses}</Label>
              <Input
                id="responses"
                type="number"
                min={0}
                value={form.responses}
                onChange={(e) => setForm((prev) => ({ ...prev, responses: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">{copy.validationPage.note}</Label>
            <Input
              id="note"
              value={form.note}
              onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
            />
          </div>
          <Button type="submit">{copy.validationPage.submit}</Button>
        </form>

        <Card className="border-white/5 bg-white/[0.03]">
          <p className="text-sm font-semibold text-primaryText">{copy.result.recommendationHistoryTitle}</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {state.validationRuns.slice(0, 5).map((entry) => (
              <li key={entry.id}>
                • {entry.problem} ({entry.responses}/{entry.attempts})
              </li>
            ))}
          </ul>
        </Card>
      </Card>
    </div>
  );
}
