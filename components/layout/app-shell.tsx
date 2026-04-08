"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/diagnosis", label: "Diagnosis" },
  { href: "/result", label: "Result" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/strategy", label: "Strategy" },
  { href: "/actions", label: "Actions" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-accent">
            EERSTEP
          </Link>
          <div className="flex gap-1 overflow-x-auto">
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
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
