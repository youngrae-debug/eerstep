"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCopy } from "@/hooks/use-locale";
import { LOCALE_LABELS, LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { copy, locale, setLocale } = useCopy();
  const navItems = [
    { href: "/", label: copy.nav.home },
    { href: "/diagnosis", label: copy.nav.diagnosis },
    { href: "/result", label: copy.nav.result },
    { href: "/dashboard", label: copy.nav.dashboard },
    { href: "/strategy", label: copy.nav.strategy },
    { href: "/actions", label: copy.nav.actions },
    { href: "/validation", label: copy.nav.validation },
    { href: "/metrics", label: copy.nav.metrics }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-accent">
            EERSTEP
          </Link>
          <div className="flex items-center gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs text-secondaryText transition hover:text-primaryText",
                  pathname === item.href && "bg-white/10 text-primaryText"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex shrink-0 items-center rounded-xl border border-white/10 bg-white/5 p-1">
              <span className="sr-only">{copy.language.label}</span>
              {LOCALES.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 rounded-lg px-2.5 text-xs",
                    locale === value && "bg-white/10 text-primaryText hover:bg-white/10"
                  )}
                  onClick={() => setLocale(value)}
                >
                  {LOCALE_LABELS[value]}
                </Button>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
