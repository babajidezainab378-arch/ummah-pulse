"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addDhikrTap,
  JOURNEY_KEY,
  removeReminder,
  resetDhikrRound,
  sanitizeJourney,
  setDhikrTarget,
  toggleReminder,
  type JourneyData,
} from "@/lib/storage/journey";
import { readLocal, writeLocal } from "@/lib/storage/local";

export interface JourneyStore {
  data: JourneyData;
  tapDhikr: () => void;
  resetDhikr: () => void;
  changeDhikrTarget: (target: number) => void;
  toggleSavedReminder: (text: string) => void;
  removeSavedReminder: (text: string) => void;
}

/**
 * The one place personal data lives. Called once in App.tsx and passed
 * down, so the Dhikr counter, Home and My Journey always show the same
 * numbers.
 *
 * Reading saved data in the useState initializer is safe because the
 * whole app renders client-only (ssr:false in app/page.tsx). Because the
 * saved data is loaded BEFORE the first render, the "save" effect below
 * can never overwrite it with empty defaults.
 */
export function useJourney(): JourneyStore {
  const [data, setData] = useState<JourneyData>(() => sanitizeJourney(readLocal<unknown>(JOURNEY_KEY)));

  useEffect(() => {
    writeLocal(JOURNEY_KEY, data);
  }, [data]);

  const tapDhikr = useCallback(() => setData((d) => addDhikrTap(d, new Date())), []);
  const resetDhikr = useCallback(() => setData((d) => resetDhikrRound(d)), []);
  const changeDhikrTarget = useCallback((t: number) => setData((d) => setDhikrTarget(d, t)), []);
  const toggleSavedReminder = useCallback(
    (text: string) => setData((d) => toggleReminder(d, text, new Date())),
    []
  );
  const removeSavedReminder = useCallback((text: string) => setData((d) => removeReminder(d, text)), []);

  return { data, tapDhikr, resetDhikr, changeDhikrTarget, toggleSavedReminder, removeSavedReminder };
}
