/**
 * UmmahPulse's single local store for personal data: the Dhikr counter and
 * saved reminders. The Dhikr counter, the Home dashboard and My Journey all
 * read from this one object, so they can never disagree.
 *
 * Everything here is a pure function (no React, no localStorage access) so
 * it is easy to test. Reading/writing the browser happens in
 * hooks/useJourney.ts.
 */

export const JOURNEY_KEY = "ummahpulse-journey";

export const DHIKR_TARGETS = [33, 100] as const;
export const DEFAULT_DHIKR_TARGET = 33;

/** How many days of dhikr history to keep, so storage never grows forever. */
const MAX_HISTORY_DAYS = 90;

export interface DhikrState {
  /** Current round count — what the counter button shows. */
  count: number;
  /** Round target (33 or 100). */
  target: number;
  /** Every tap ever made, grouped by local day: { "2026-10-15": 61 }. */
  daily: Record<string, number>;
}

export interface SavedReminder {
  text: string;
  /** ISO timestamp of when it was saved. */
  savedAt: string;
}

export interface JourneyData {
  version: 1;
  dhikr: DhikrState;
  savedReminders: SavedReminder[];
}

export const DEFAULT_JOURNEY: JourneyData = {
  version: 1,
  dhikr: { count: 0, target: DEFAULT_DHIKR_TARGET, daily: {} },
  savedReminders: [],
};

/** Local-time day key, e.g. "2026-10-15" (not UTC, so the day rolls over at local midnight). */
export function dayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isCount(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n) && n >= 0;
}

/**
 * Turns whatever is in localStorage into valid JourneyData. Anything
 * missing, corrupted or hand-edited falls back to a safe default instead
 * of crashing the app.
 */
export function sanitizeJourney(raw: unknown): JourneyData {
  if (!raw || typeof raw !== "object") return DEFAULT_JOURNEY;
  const r = raw as Record<string, unknown>;

  const d = (r.dhikr && typeof r.dhikr === "object" ? r.dhikr : {}) as Record<string, unknown>;
  const target = isCount(d.target) && d.target > 0 ? Math.floor(d.target) : DEFAULT_DHIKR_TARGET;
  const count = isCount(d.count) ? Math.floor(d.count) : 0;

  const daily: Record<string, number> = {};
  if (d.daily && typeof d.daily === "object") {
    for (const [k, v] of Object.entries(d.daily as Record<string, unknown>)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(k) && isCount(v) && v > 0) daily[k] = Math.floor(v);
    }
  }

  const savedReminders: SavedReminder[] = [];
  if (Array.isArray(r.savedReminders)) {
    for (const item of r.savedReminders) {
      if (item && typeof item === "object") {
        const it = item as Record<string, unknown>;
        if (typeof it.text === "string" && it.text.length > 0) {
          savedReminders.push({
            text: it.text,
            savedAt: typeof it.savedAt === "string" ? it.savedAt : new Date(0).toISOString(),
          });
        }
      }
    }
  }

  return { version: 1, dhikr: { count, target, daily }, savedReminders };
}

function pruneHistory(daily: Record<string, number>): Record<string, number> {
  const keys = Object.keys(daily).sort(); // ISO day keys sort chronologically
  if (keys.length <= MAX_HISTORY_DAYS) return daily;
  const keep = keys.slice(keys.length - MAX_HISTORY_DAYS);
  const out: Record<string, number> = {};
  for (const k of keep) out[k] = daily[k];
  return out;
}

/** One tap on the counter: bumps the round count and today's total together. */
export function addDhikrTap(data: JourneyData, now: Date): JourneyData {
  const key = dayKey(now);
  const daily = pruneHistory({ ...data.dhikr.daily, [key]: (data.dhikr.daily[key] ?? 0) + 1 });
  return { ...data, dhikr: { ...data.dhikr, count: data.dhikr.count + 1, daily } };
}

/**
 * Reset only restarts the current round. Taps already made today stay in
 * today's total, because that dhikr was really said.
 */
export function resetDhikrRound(data: JourneyData): JourneyData {
  return { ...data, dhikr: { ...data.dhikr, count: 0 } };
}

/** Changing the target starts a fresh round (same as the original behaviour). */
export function setDhikrTarget(data: JourneyData, target: number): JourneyData {
  return { ...data, dhikr: { ...data.dhikr, target, count: 0 } };
}

export function isReminderSaved(data: JourneyData, text: string): boolean {
  return data.savedReminders.some((r) => r.text === text);
}

/** Save if not saved, remove if already saved. */
export function toggleReminder(data: JourneyData, text: string, now: Date): JourneyData {
  if (isReminderSaved(data, text)) {
    return { ...data, savedReminders: data.savedReminders.filter((r) => r.text !== text) };
  }
  return {
    ...data,
    savedReminders: [{ text, savedAt: now.toISOString() }, ...data.savedReminders],
  };
}

export function removeReminder(data: JourneyData, text: string): JourneyData {
  return { ...data, savedReminders: data.savedReminders.filter((r) => r.text !== text) };
}

/** Today's total taps. */
export function dhikrToday(data: JourneyData, now: Date): number {
  return data.dhikr.daily[dayKey(now)] ?? 0;
}

/** Most recent days first, e.g. [["2026-10-15", 61], ["2026-10-14", 33]]. */
export function dhikrRecentDays(data: JourneyData, limit = 7): Array<[string, number]> {
  return Object.entries(data.dhikr.daily)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, limit);
}
