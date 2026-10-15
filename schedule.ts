import { PRAYER_ORDER } from "@/data/prayerOptions";
import type { NextPrayer, PrayerKey, PrayerTimings, ScheduleItem } from "@/types";

function cleanTime(raw: string): string {
  return (raw || "").split(" ")[0];
}

function parseTimeOn(raw: string, base: Date): Date {
  const clean = cleanTime(raw);
  const [h, m] = clean.split(":").map(Number);
  const d = new Date(base);
  d.setHours(h || 0, m || 0, 0, 0);
  return d;
}

export function buildSchedule(timings: PrayerTimings, now: Date): ScheduleItem[] {
  return PRAYER_ORDER.map((key) => ({
    key: key as PrayerKey,
    date: parseTimeOn(timings[key], now),
  }));
}

/**
 * Finds the next prayer after `now`. If every prayer for today has
 * passed, falls back to today's Fajr time + 24h as an approximation
 * for tomorrow's Fajr (accurate to within a minute or two — good
 * enough for a countdown, avoids a second network round-trip).
 */
export function getNextPrayer(schedule: ScheduleItem[], now: Date): NextPrayer {
  const upcoming = schedule.find((p) => p.date.getTime() > now.getTime());
  if (upcoming) return { ...upcoming, isTomorrow: false };

  const fajr = schedule.find((p) => p.key === "Fajr")!;
  return { key: "Fajr", date: new Date(fajr.date.getTime() + 86400000), isTomorrow: true };
}
