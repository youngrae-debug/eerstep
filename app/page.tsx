import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="page-grid">
      <section className="grid min-h-[70vh] items-center gap-8 py-8">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">Strategy-based wealth progression</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Your wealth problem is not effort. It&apos;s strategy.
          </h1>
          <p className="max-w-xl text-lg text-secondaryText">
            eerstep tells you what to do next based on your current wealth level. No noise. No budgeting complexity.
          </p>
          <Link href="/diagnosis">
            <Button size="lg" className="gap-2">
              Check your level <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Card className="max-w-3xl">
          <p className="text-xs uppercase tracking-wide text-secondaryText">System promise</p>
          <div className="mt-4 grid gap-3 text-sm text-secondaryText md:grid-cols-3">
            <p><span className="text-primaryText">Current state:</span> Identify your real level instantly.</p>
            <p><span className="text-primaryText">Strategy:</span> Use the right wealth strategy for that level.</p>
            <p><span className="text-primaryText">Next action:</span> Execute 3-5 actions that move you upward.</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
