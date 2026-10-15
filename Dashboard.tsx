import { BookOpen, Sparkles } from "lucide-react";
import TodayCard from "@/components/calendar/TodayCard";
import FocusCard from "@/components/home/FocusCard";
import RamadanCountdownCard from "@/components/home/RamadanCountdownCard";
import ReflectionCard from "@/components/home/ReflectionCard";
import SeasonTeaser from "@/components/home/SeasonTeaser";
import ProgressCard from "@/components/ui/ProgressCard";
import NextPrayerCard from "@/components/worship/NextPrayerCard";
import type { JourneyStore } from "@/hooks/useJourney";
import type { PrayerEngine } from "@/hooks/usePrayerEngine";
import type { HijriDate } from "@/lib/calendar/hijri";
import type { ActiveSeason } from "@/types";

interface DashboardProps {
  hijri: HijriDate;
  hijriMonth: string;
  gregorian: string;
  season: ActiveSeason;
  reflection: string;
  saved: boolean;
  onSave: () => void;
  onOpenCalendar: () => void;
  prayer: PrayerEngine;
  journey: JourneyStore;
}

/** Season-aware year-round homepage. */
export default function Dashboard({
  hijri,
  hijriMonth,
  gregorian,
  season,
  reflection,
  saved,
  onSave,
  onOpenCalendar,
  prayer,
  journey,
}: DashboardProps) {
  const { count, target } = journey.data.dhikr;
  return (
    <div className="up-dash">
      <section className="up-greeting">
        <p className="up-greeting-top">Assalamu Alaikum 🤍</p>
        <h2 className="up-greeting-main">May today bring you closer to Allah.</h2>
      </section>

      <TodayCard hijriDay={hijri.day} hijriMonth={hijriMonth} hijriYear={hijri.year} gregorian={gregorian} />

      <NextPrayerCard prayer={prayer} />

      <ReflectionCard reflection={reflection} saved={saved} onSave={onSave} />

      <section className="up-grid-2">
        <ProgressCard icon={BookOpen} label="Qur'an Journey" value="—" total="tracking coming soon" fraction={0} />
        <ProgressCard
          icon={Sparkles}
          label="Dhikr"
          value={String(count)}
          total={`of ${target}`}
          fraction={Math.min(1, count / target)}
        />
      </section>

      <FocusCard />

      {season.key === "normal" ? (
        <SeasonTeaser daysToRamadan={season.daysToRamadan} onOpenCalendar={onOpenCalendar} />
      ) : (
        <RamadanCountdownCard active={season.key === "ramadan-active"} />
      )}
    </div>
  );
}
