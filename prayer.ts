import type { ComponentType } from "react";

export type LocationMode = "gps" | "manual";

export interface PrayerLocation {
  mode: LocationMode;
  lat?: number;
  lon?: number;
  city?: string;
  country?: string;
  label: string;
}

export interface PrayerSettings {
  method: number;
  school: number; // Asr calculation: 0 = Standard, 1 = Hanafi
  timeFormat: "12" | "24";
}

export type PrayerKey = "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

/** Raw timings object returned by the Al Adhan API (subset we use). */
export type PrayerTimings = Record<string, string>;

export interface ScheduleItem {
  key: PrayerKey;
  date: Date;
}

export interface NextPrayer {
  key: PrayerKey;
  date: Date;
  isTomorrow: boolean;
}

export type PrayerStatus = "init" | "no-location" | "loading" | "ready" | "error";

export interface CalcMethod {
  id: number;
  name: string;
  tag?: string;
}

export interface AsrSchool {
  id: number;
  name: string;
}

export interface CityOption {
  city: string;
  country: string;
}

export interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export type IconComponent = ComponentType<IconProps>;
