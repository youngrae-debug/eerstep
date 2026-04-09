"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCopy } from "@/hooks/use-locale";

export default function LandingPage() {
  const { copy } = useCopy();

  return (
    <div className="page-grid">
      <section className="grid min-h-[70vh] items-center gap-8 py-8">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">{copy.landing.eyebrow}</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">{copy.landing.title}</h1>
          <p className="max-w-xl text-lg text-secondaryText">{copy.landing.description}</p>
          <p className="text-sm text-secondaryText">{copy.landing.helper}</p>
          <Link href="/diagnosis">
            <Button size="lg" className="gap-2">
              {copy.landing.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Card className="max-w-3xl">
          <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.landing.promiseTitle}</p>
          <div className="mt-4 grid gap-3 text-sm text-secondaryText md:grid-cols-3">
            <p><span className="text-primaryText">{copy.landing.currentStateLabel}</span> {copy.landing.currentStateBody}</p>
            <p><span className="text-primaryText">{copy.landing.strategyLabel}</span> {copy.landing.strategyBody}</p>
            <p><span className="text-primaryText">{copy.landing.nextActionLabel}</span> {copy.landing.nextActionBody}</p>
          </div>
        </Card>

        <Card className="max-w-5xl">
          <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.landing.howItWorksTitle}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-base font-semibold text-primaryText">{copy.landing.stepOneTitle}</p>
              <p className="text-sm leading-6 text-secondaryText">{copy.landing.stepOneBody}</p>
            </div>
            <div className="space-y-2">
              <p className="text-base font-semibold text-primaryText">{copy.landing.stepTwoTitle}</p>
              <p className="text-sm leading-6 text-secondaryText">{copy.landing.stepTwoBody}</p>
            </div>
            <div className="space-y-2">
              <p className="text-base font-semibold text-primaryText">{copy.landing.stepThreeTitle}</p>
              <p className="text-sm leading-6 text-secondaryText">{copy.landing.stepThreeBody}</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
