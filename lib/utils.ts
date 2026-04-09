import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getNumberLocale, type Locale } from "@/lib/i18n";

const KRW_PER_USD = 1500.4653;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrencyCode(locale: Locale) {
  return locale === "ko" ? "KRW" : "USD";
}

export function toDisplayCurrencyAmount(value: number, locale: Locale) {
  return locale === "ko" ? value : value / KRW_PER_USD;
}

export function toBaseCurrencyAmount(value: number, locale: Locale) {
  return locale === "ko" ? value : value * KRW_PER_USD;
}

export function formatCurrency(value: number, locale: Locale) {
  return new Intl.NumberFormat(getNumberLocale(locale), {
    style: "currency",
    currency: getCurrencyCode(locale),
    maximumFractionDigits: 0
  }).format(toDisplayCurrencyAmount(value, locale));
}

export function formatPercent(value: number, locale: Locale) {
  return new Intl.NumberFormat(getNumberLocale(locale), {
    style: "percent",
    maximumFractionDigits: 1
  }).format(value);
}

export function formatCompactNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(getNumberLocale(locale), {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(toDisplayCurrencyAmount(value, locale));
}

export function formatInputAmount(value: number, locale: Locale) {
  return Math.round(toDisplayCurrencyAmount(value, locale)).toString();
}
