import type { Locale } from "@/lib/i18n";

const MOCK_NET_WORTH_HISTORY: Record<Locale, { month: string; value: number }[]> = {
  ko: [
    { month: "1월", value: 22_000_000 },
    { month: "2월", value: 24_000_000 },
    { month: "3월", value: 28_000_000 },
    { month: "4월", value: 30_000_000 },
    { month: "5월", value: 34_000_000 },
    { month: "6월", value: 39_000_000 }
  ],
  en: [
    { month: "Jan", value: 22_000_000 },
    { month: "Feb", value: 24_000_000 },
    { month: "Mar", value: 28_000_000 },
    { month: "Apr", value: 30_000_000 },
    { month: "May", value: 34_000_000 },
    { month: "Jun", value: 39_000_000 }
  ]
};

export function getMockNetWorthHistory(locale: Locale) {
  return MOCK_NET_WORTH_HISTORY[locale];
}
