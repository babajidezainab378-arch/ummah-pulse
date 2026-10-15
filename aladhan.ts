import type { PrayerLocation, PrayerSettings, PrayerTimings } from "@/types";

/**
 * Al Adhan API (https://aladhan.com/prayer-times-api) — free, no API
 * key required, permissive CORS. This is the only place that talks to
 * the network for prayer data; swap providers by editing this file only.
 *
 * NEXT_PUBLIC_PRAYER_API_BASE lets you override the base URL from the
 * environment (e.g. if you later put a proxy in front of it) without
 * touching this code.
 */
const API_BASE =
  process.env.NEXT_PUBLIC_PRAYER_API_BASE || "https://api.aladhan.com";

export async function fetchAladhanTimings(
  location: PrayerLocation,
  settings: PrayerSettings
): Promise<PrayerTimings> {
  const ts = Math.floor(Date.now() / 1000);

  const base =
    location.mode === "gps"
      ? `${API_BASE}/v1/timings/${ts}?latitude=${location.lat}&longitude=${location.lon}`
      : `${API_BASE}/v1/timingsByCity/${ts}?city=${encodeURIComponent(
          location.city || ""
        )}&country=${encodeURIComponent(location.country || "")}`;

  const url = `${base}&method=${settings.method}&school=${settings.school}`;

  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new Error(
      "Couldn't reach the prayer time service. Check your connection and try again."
    );
  }

  if (!res.ok) {
    throw new Error("The prayer time service returned an error. Please try again.");
  }

  const json = await res.json();

  if (json.code !== 200 || !json.data || !json.data.timings) {
    throw new Error("That location couldn't be found. Try a nearby major city instead.");
  }

  return json.data.timings as PrayerTimings;
}
