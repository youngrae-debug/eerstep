import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { LanguageProvider } from "@/hooks/use-locale";
import { WealthProvider } from "@/hooks/use-wealth-store";

export const metadata: Metadata = {
  title: "eerstep",
  description: "Strategy-based wealth progression system with Korean and English support"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body>
        <LanguageProvider>
          <WealthProvider>
            <AppShell>{children}</AppShell>
          </WealthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
