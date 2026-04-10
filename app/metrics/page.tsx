"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useCopy } from "@/hooks/use-locale";
import { getTrackedEvents } from "@/lib/analytics";
import { formatPercent } from "@/lib/utils";

function safeRate(numerator: number, denominator: number) {
  if (denominator <= 0) return 0;
  return numerator / denominator;
}

export default function MetricsPage() {
  const { copy, locale } = useCopy();
  const events = getTrackedEvents();

  const summary = useMemo(() => {
    const count = (name: string) => events.filter((event) => event.name === name).length;

    const diagnosisSubmitted = count("diagnosis_submitted");
    const resultViewed = count("result_viewed");
    const sprintStarted = count("sprint_started");
    const validationStarted = count("validation_started");
    const validationSaved = count("validation_saved");
    const firstResponse = count("first_response_recorded");

    return {
      diagnosisSubmitted,
      resultViewed,
      sprintStarted,
      validationStarted,
      validationSaved,
      firstResponse,
      resultConversion: safeRate(resultViewed, diagnosisSubmitted),
      sprintConversion: safeRate(sprintStarted, resultViewed),
      validationSaveRate: safeRate(validationSaved, validationStarted),
      firstResponseRate: safeRate(firstResponse, validationSaved)
    };
  }, [events]);

  return (
    <div className="page-grid">
      <Card className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.metricsPage.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold">{copy.metricsPage.title}</h1>
          <p className="mt-2 text-sm text-secondaryText">{copy.metricsPage.description}</p>
        </div>

        {events.length === 0 ? (
          <Card className="border-white/5 bg-white/[0.03] text-sm text-secondaryText">{copy.metricsPage.noData}</Card>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card><p className="text-xs text-secondaryText">{copy.metricsPage.diagnosisSubmitted}</p><p className="mt-2 text-2xl font-semibold">{summary.diagnosisSubmitted}</p></Card>
              <Card><p className="text-xs text-secondaryText">{copy.metricsPage.resultViewed}</p><p className="mt-2 text-2xl font-semibold">{summary.resultViewed}</p></Card>
              <Card><p className="text-xs text-secondaryText">{copy.metricsPage.sprintStarted}</p><p className="mt-2 text-2xl font-semibold">{summary.sprintStarted}</p></Card>
              <Card><p className="text-xs text-secondaryText">{copy.metricsPage.validationStarted}</p><p className="mt-2 text-2xl font-semibold">{summary.validationStarted}</p></Card>
              <Card><p className="text-xs text-secondaryText">{copy.metricsPage.validationSaved}</p><p className="mt-2 text-2xl font-semibold">{summary.validationSaved}</p></Card>
              <Card><p className="text-xs text-secondaryText">{copy.metricsPage.firstResponse}</p><p className="mt-2 text-2xl font-semibold">{summary.firstResponse}</p></Card>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <p className="text-xs text-secondaryText">{copy.metricsPage.resultConversion}</p>
                <p className="mt-2 text-xl font-semibold">{formatPercent(summary.resultConversion, locale)}</p>
              </Card>
              <Card>
                <p className="text-xs text-secondaryText">{copy.metricsPage.sprintConversion}</p>
                <p className="mt-2 text-xl font-semibold">{formatPercent(summary.sprintConversion, locale)}</p>
              </Card>
              <Card>
                <p className="text-xs text-secondaryText">{copy.metricsPage.validationSaveRate}</p>
                <p className="mt-2 text-xl font-semibold">{formatPercent(summary.validationSaveRate, locale)}</p>
              </Card>
              <Card>
                <p className="text-xs text-secondaryText">{copy.metricsPage.firstResponseRate}</p>
                <p className="mt-2 text-xl font-semibold">{formatPercent(summary.firstResponseRate, locale)}</p>
              </Card>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
