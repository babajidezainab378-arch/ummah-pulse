import type { ActiveSeason } from "@/types";

/**
 * Estimated Ramadan 1448 AH window (per Umm al-Qura projections).
 * Update these two dates once the official start is confirmed by
 * moon sighting — nothing else in the app needs to change.
 */
export const RAMADAN_1448_START = new Date("2027-02-08T00:00:00");
export const RAMADAN_1448_END = new Date("2027-03-09T00:00:00");

/** How many days out the big countdown card takes over Home. */
const RAMADAN_FEATURE_WINDOW_DAYS = 60;

/**
 * The single place that decides what Home should feature. New seasons
 * (Dhul Hijjah, Muharram, ...) plug in here later — nothing about the
 * navigation or Home's layout needs to change when they do.
 */
export function getActiveSeason(now: Date): ActiveSeason {
  if (now >= RAMADAN_1448_START && now <= RAMADAN_1448_END) {
    return { key: "ramadan-active", label: "Ramadan 1448" };
  }

  const daysToRamadan = Math.ceil((RAMADAN_1448_START.getTime() - now.getTime()) / 86400000);

  if (daysToRamadan > 0 && daysToRamadan <= RAMADAN_FEATURE_WINDOW_DAYS) {
    return { key: "ramadan-approaching", label: "Ramadan 1448", daysToRamadan };
  }

  return { key: "normal", label: null, daysToRamadan };
}
