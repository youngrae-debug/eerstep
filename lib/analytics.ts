"use client";

type EventName =
  | "diagnosis_submitted"
  | "result_viewed"
  | "sprint_started"
  | "dashboard_cta_clicked"
  | "action_toggled"
  | "validation_started"
  | "validation_saved"
  | "first_response_recorded";

type EventPayload = Record<string, string | number | boolean | null | undefined>;

const ANALYTICS_KEY = "eerstep-analytics-events";
const ANALYTICS_USER_KEY = "eerstep-analytics-user-id";

function createEventId() {
  return globalThis.crypto?.randomUUID?.() ?? `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getOrCreateAnalyticsUserId() {
  const existing = window.localStorage.getItem(ANALYTICS_USER_KEY);
  if (existing) return existing;

  const generated =
    globalThis.crypto?.randomUUID?.() ?? `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(ANALYTICS_USER_KEY, generated);
  return generated;
}

export function trackEvent(eventName: EventName, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  const event = {
    id: createEventId(),
    name: eventName,
    timestamp: new Date().toISOString(),
    userId: getOrCreateAnalyticsUserId(),
    payload
  };

  const existing = window.localStorage.getItem(ANALYTICS_KEY);
  const events = existing ? (JSON.parse(existing) as typeof event[]) : [];
  window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify([event, ...events].slice(0, 500)));

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event);
  }
}

export function getTrackedEvents() {
  if (typeof window === "undefined") return [];
  const existing = window.localStorage.getItem(ANALYTICS_KEY);
  return existing ? (JSON.parse(existing) as Array<{ name: EventName; payload: EventPayload; timestamp: string }>) : [];
}
