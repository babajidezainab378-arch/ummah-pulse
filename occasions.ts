import { CalendarDays, Moon, Sparkles, Sunrise } from "lucide-react";
import type { IconComponent } from "@/types";

export interface Occasion {
  name: string;
  date: Date;
  icon: IconComponent;
}

/**
 * Estimated dates — pending official moon sighting. Update alongside
 * lib/seasons/ramadan.ts as each season is confirmed.
 */
export const UPCOMING_OCCASIONS: Occasion[] = [
  { name: "Ramadan 1448 begins", date: new Date("2027-02-08T00:00:00"), icon: Moon },
  { name: "Laylatul Qadr (odd nights, last 10)", date: new Date("2027-03-05T00:00:00"), icon: Sparkles },
  { name: "Eid al-Fitr", date: new Date("2027-03-10T00:00:00"), icon: Sunrise },
  { name: "Islamic New Year 1449", date: new Date("2027-06-15T00:00:00"), icon: CalendarDays },
];
