import { BookOpen } from "lucide-react";
import DhikrCounter from "@/components/worship/DhikrCounter";
import DuaLibrary from "@/components/worship/DuaLibrary";
import PrayerSection from "@/components/worship/PrayerSection";
import ProgressCard from "@/components/ui/ProgressCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { JourneyStore } from "@/hooks/useJourney";
import type { PrayerEngine } from "@/hooks/usePrayerEngine";

interface WorshipHubProps {
  prayer: PrayerEngine;
  onOpenSettings: () => void;
  journey: JourneyStore;
}

/** Prayer first — it's the most time-sensitive daily feature. */
export default function WorshipHub({ prayer, onOpenSettings, journey }: WorshipHubProps) {
  return (
    <div className="up-dash">
      <SectionHeading title="Worship" note="Prayer, Qur'an, dhikr and du'a in one place." />

      <PrayerSection prayer={prayer} onOpenSettings={onOpenSettings} />

      <ProgressCard
        icon={BookOpen}
        label="Qur'an Journey"
        value="Not tracked yet"
        total="Qur'an progress tracking is coming soon"
        fraction={0}
      />

      <DhikrCounter journey={journey} />
      <DuaLibrary />
    </div>
  );
}
