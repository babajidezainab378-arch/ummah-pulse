"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useNow } from "@/hooks/useNow";
import { fetchAladhanTimings } from "@/lib/prayer/aladhan";
import { buildSchedule, getNextPrayer } from "@/lib/prayer/schedule";
import { readLocal, writeLocal } from "@/lib/storage/local";
import { DEFAULT_SETTINGS } from "@/data/prayerOptions";
import type {
  NextPrayer,
  PrayerLocation,
  PrayerSettings,
  PrayerStatus,
  PrayerTimings,
  ScheduleItem,
} from "@/types";

const LOCATION_KEY = "ummahpulse-location";
const SETTINGS_KEY = "ummahpulse-prayer-settings";

export interface PrayerEngine {
  now: Date;
  location: PrayerLocation | null;
  settings: PrayerSettings;
  status: PrayerStatus;
  errorMsg: string;
  usingCache: boolean;
  schedule: ScheduleItem[] | null;
  next: NextPrayer | null;
  setLocation: (loc: PrayerLocation) => void;
  requestGPS: () => void;
  setManualCity: (city: string, country: string) => void;
  updateSettings: (patch: Partial<PrayerSettings>) => void;
  retry: () => void;
}

/**
 * Central prayer state — used by the Home summary card and by the full
 * Worship / Settings screens. One hook, one source of truth, so Home
 * and Worship are always showing the same data.
 */
export function usePrayerEngine(): PrayerEngine {
  const now = useNow(1000);
  const [ready, setReady] = useState(false);
  const [location, setLocationState] = useState<PrayerLocation | null>(null);
  const [settings, setSettingsState] = useState<PrayerSettings>(DEFAULT_SETTINGS);
  const [status, setStatus] = useState<PrayerStatus>("init");
  const [errorMsg, setErrorMsg] = useState("");
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [usingCache, setUsingCache] = useState(false);
  const [retryTick, setRetryTick] = useState(0);
  const cacheRef = useRef<{ key: string; timings: PrayerTimings } | null>(null);

  // Load any remembered location/settings once, on mount (client-only).
  useEffect(() => {
    const loc = readLocal<PrayerLocation>(LOCATION_KEY);
    const prefs = readLocal<PrayerSettings>(SETTINGS_KEY);
    if (loc) setLocationState(loc);
    if (prefs) setSettingsState({ ...DEFAULT_SETTINGS, ...prefs });
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!location) {
      setStatus("no-location");
      return;
    }

    let cancelled = false;
    setStatus("loading");
    setErrorMsg("");

    fetchAladhanTimings(location, settings)
      .then((t) => {
        if (cancelled) return;
        setTimings(t);
        cacheRef.current = { key: location.label + now.toDateString(), timings: t };
        setUsingCache(false);
        setStatus("ready");
      })
      .catch((err: Error) => {
        if (cancelled) return;
        const cached = cacheRef.current;
        if (cached && cached.key === location.label + now.toDateString()) {
          setTimings(cached.timings);
          setUsingCache(true);
          setStatus("ready");
        } else {
          setStatus("error");
          setErrorMsg(err.message);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, location, settings.method, settings.school, now.toDateString(), retryTick]);

  function setLocation(loc: PrayerLocation) {
    setLocationState(loc);
    writeLocal(LOCATION_KEY, loc);
  }

  function updateSettings(patch: Partial<PrayerSettings>) {
    const next = { ...settings, ...patch };
    setSettingsState(next);
    writeLocal(SETTINGS_KEY, next);
  }

  function requestGPS() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("error");
      setErrorMsg("This browser doesn't support location access — choose a city instead.");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          mode: "gps",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: "Current location",
        });
      },
      () => {
        setStatus("error");
        setErrorMsg("Location permission was denied — choose a city instead.");
      },
      { timeout: 10000 }
    );
  }

  function setManualCity(city: string, country: string) {
    setLocation({ mode: "manual", city, country, label: `${city}, ${country}` });
  }

  function retry() {
    setRetryTick((t) => t + 1);
  }

  const schedule = useMemo(
    () => (timings ? buildSchedule(timings, now) : null),
    [timings, now.toDateString()]
  );
  const next = useMemo(
    () => (schedule ? getNextPrayer(schedule, now) : null),
    [schedule, now.getTime()]
  );

  return {
    now,
    location,
    settings,
    status,
    errorMsg,
    usingCache,
    schedule,
    next,
    setLocation,
    requestGPS,
    setManualCity,
    updateSettings,
    retry,
  };
}
