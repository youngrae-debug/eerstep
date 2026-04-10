"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCopy } from "@/hooks/use-locale";
import { useWealthStore } from "@/hooks/use-wealth-store";
import { trackEvent } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";
import {
  getActionDisplayTitle,
  getBottleneckLabel,
  getNextBestAction,
  getNextLevelTarget,
  getSevenDaySprint,
  getStrategy
} from "@/lib/wealth";

export default function ResultPage() {
  const { copy, locale } = useCopy();
  const { state } = useWealthStore();
  const strategy = getStrategy(state.level, locale);
  const target = getNextLevelTarget(state.netWorth);
  const nextAction = getNextBestAction(
    state.level,
    state.bottleneck,
    state.timeCapacity,
    state.salesConfidence,
    locale
  );
  const sprintPlan = getSevenDaySprint(nextAction.primary, locale);

  useEffect(() => {
    trackEvent("result_viewed", {
      level: state.level,
      bottleneck: state.bottleneck,
      netWorth: state.netWorth
    });
  }, [state.level, state.bottleneck, state.netWorth]);

  return (
    <div className="page-grid">
      <Card className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.result.eyebrow}</p>
          <h1 className="mt-2 text-4xl font-semibold">
            {locale === "ko" ? `당신은 레벨 ${state.level}입니다` : `You are Level ${state.level}`}
          </h1>
          <p className="mt-2 text-secondaryText">{copy.result.netWorth}: {formatCurrency(state.netWorth, locale)}</p>
          <p className="text-secondaryText">
            {copy.result.nextLevelTarget}: {target ? formatCurrency(target, locale) : copy.result.topLevelAchieved}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold text-primaryText">{copy.result.bottleneckTitle}</p>
            <p className="mt-2 text-sm text-secondaryText">{getBottleneckLabel(state.bottleneck, locale)}</p>
            <p className="mt-4 text-sm font-semibold text-accent">{copy.result.todayAction}</p>
            <p className="mt-2 text-sm text-secondaryText">{nextAction.primary}</p>
            <p className="mt-4 text-sm font-semibold text-primaryText">{copy.result.alternativeActions}</p>
            <ul className="mt-2 space-y-1 text-sm text-secondaryText">
              {nextAction.secondary.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-secondaryText">{nextAction.coaching.time}</p>
            <p className="mt-1 text-xs text-secondaryText">{nextAction.coaching.sales}</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-accent">{copy.result.strategyTitle}</p>
            <ul className="mt-3 space-y-2 text-sm text-secondaryText">
              {strategy.keyStrategy.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-rose-300">{copy.result.avoidTitle}</p>
            <ul className="mt-3 space-y-2 text-sm text-secondaryText">
              {nextAction.avoid.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </Card>
        </div>

        <Card>
          <p className="text-sm font-semibold">{copy.result.recommendedActions}</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {state.actions.slice(0, 5).map((action) => (
              <li key={action.id}>• {getActionDisplayTitle(action, locale)}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <p className="text-sm font-semibold">{copy.result.recommendationHistoryTitle}</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {state.recommendationHistory.slice(0, 3).map((entry) => (
              <li key={entry.id}>
                • {entry.primaryAction}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-accent">{copy.result.sprintPreviewTitle}</p>
          <ul className="mt-3 space-y-2 text-sm text-secondaryText">
            {sprintPlan.map((item) => (
              <li key={item.day}>
                <span className="text-primaryText">{item.day} · {item.focus}</span> — {item.task}
              </li>
            ))}
          </ul>
          <Link href="/actions" className="mt-4 inline-block">
            <Button
              size="sm"
              onClick={() =>
                trackEvent("sprint_started", {
                  level: state.level,
                  bottleneck: state.bottleneck,
                  action: nextAction.primary
                })
              }
            >
              {copy.result.sprintStart}
            </Button>
          </Link>
          <Link href="/validation" className="ml-2 inline-block">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                trackEvent("validation_started", {
                  level: state.level,
                  bottleneck: state.bottleneck,
                  source: "result_cta"
                })
              }
            >
              {copy.result.validationCta}
            </Button>
          </Link>
        </Card>

        <Link href="/dashboard">
          <Button
            size="lg"
            onClick={() =>
              trackEvent("dashboard_cta_clicked", {
                level: state.level,
                bottleneck: state.bottleneck
              })
            }
          >
            {copy.result.cta}
          </Button>
        </Link>
      </Card>
    </div>
  );
}
