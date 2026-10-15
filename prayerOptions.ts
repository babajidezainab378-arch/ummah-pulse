import type { AsrSchool, CalcMethod, CityOption, PrayerSettings } from "@/types";

export const PRAYER_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export const CALC_METHODS: CalcMethod[] = [
  { id: 3, name: "Muslim World League" },
  { id: 5, name: "Egyptian General Authority of Survey", tag: "common in Nigeria & West Africa" },
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 4, name: "Umm Al-Qura University, Makkah" },
  { id: 1, name: "University of Islamic Sciences, Karachi" },
  { id: 9, name: "Kuwait" },
  { id: 10, name: "Qatar" },
  { id: 11, name: "Singapore" },
  { id: 13, name: "Turkey (Diyanet)" },
  { id: 15, name: "Moonsighting Committee Worldwide" },
];

export const ASR_SCHOOLS: AsrSchool[] = [
  { id: 0, name: "Standard (Shafi'i, Maliki, Hanbali)" },
  { id: 1, name: "Hanafi" },
];

export const CURATED_CITIES: CityOption[] = [
  { city: "Lagos", country: "Nigeria" },
  { city: "Abuja", country: "Nigeria" },
  { city: "Kano", country: "Nigeria" },
  { city: "Ibadan", country: "Nigeria" },
  { city: "Port Harcourt", country: "Nigeria" },
  { city: "Kaduna", country: "Nigeria" },
  { city: "London", country: "United Kingdom" },
  { city: "New York", country: "United States" },
  { city: "Toronto", country: "Canada" },
  { city: "Dubai", country: "United Arab Emirates" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Jakarta", country: "Indonesia" },
  { city: "Karachi", country: "Pakistan" },
  { city: "Cairo", country: "Egypt" },
];

export const DEFAULT_SETTINGS: PrayerSettings = { method: 3, school: 0, timeFormat: "12" };
