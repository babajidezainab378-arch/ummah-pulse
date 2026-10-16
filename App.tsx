"use client";

import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";
import MoreMenu from "@/components/navigation/MoreMenu";
import TopBar from "@/components/navigation/TopBar";
import CalendarView from "@/components/calendar/CalendarView";
import CommunityHub from "@/components/community/CommunityHub";
import Dashboard from "@/components/home/Dashboard";
import Landing from "@/components/home/Landing";
import JourneyHub from "@/components/journey/JourneyHub";
import LearnHub from "@/components/learn/LearnHub";
import PrayerSettings from "@/components/worship/PrayerSettings";
import WorshipHub from "@/components/worship/WorshipHub";
import { useJourney } from "@/hooks/useJourney";
import { useNow } from "@/hooks/useNow";
import { usePrayerEngine } from "@/hooks/usePrayerEngine";
import { gregorianToHijri, HIJRI_MONTHS } from "@/lib/calendar/hijri";
import { getActiveSeason } from "@/lib/seasons/ramadan";
import { isReminderSaved } from "@/lib/storage/journey";
import { REFLECTIONS } from "@/data/reflections";
import type { TabKey } from "@/types";

const SUB_SCREENS: TabKey[] = ["learn", "calendar", "settings"];

/**
 * The whole UmmahPulse experience. Rendered client-only (see
 * app/page.tsx) because almost everything here — the clock, geolocation,
 * localStorage, live countdowns — is browser-only by nature.
 */
export default function App() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState<TabKey>("home");
  const now = useNow();
  const prayer = usePrayerEngine();
  const journey = useJourney();

  const hijri = useMemo(() => gregorianToHijri(now), [now.toDateString()]);
  const gregorian = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const season = useMemo(() => getActiveSeason(now), [now.toDateString()]);
  const dailyReflection = REFLECTIONS[now.getDate() % REFLECTIONS.length];
  const reminderSaved = isReminderSaved(journey.data, dailyReflection);
  const isSubScreen = SUB_SCREENS.includes(tab);

  if (!entered) {
    return (
      <Landing
        onExplore={() => setEntered(true)}
        onReminder={() => {
          setEntered(true);
          setTab("home");
        }}
      />
    );
  }

  return (
    <div className="up-shell">
      <TopBar tab={tab} setTab={setTab} />
      <main className="up-main">
        {isSubScreen && (
          <button className="up-backlink" onClick={() => setTab("more")}>
            <ChevronLeft size={16} /> More
          </button>
        )}

        {tab === "home" && (
          <Dashboard
            hijri={hijri}
            hijriMonth={HIJRI_MONTHS[hijri.month - 1]}
            gregorian={gregorian}
            season={season}
            reflection={dailyReflection}
            saved={reminderSaved}
            onSave={() => journey.toggleSavedReminder(dailyReflection)}
            onOpenCalendar={() => setTab("calendar")}
            prayer={prayer}
            journey={journey}
          />
        )}
        {tab === "worship" && (
          <WorshipHub prayer={prayer} onOpenSettings={() => setTab("settings")} journey={journey} />
        )}
        {tab === "community" && <CommunityHub />}
        {tab === "journey" && <JourneyHub journey={journey} now={now} />}
        {tab === "more" && <MoreMenu setTab={setTab} />}
        {tab === "learn" && <LearnHub />}
        {tab === "calendar" && (
          <CalendarView hijri={hijri} hijriMonth={HIJRI_MONTHS[hijri.month - 1]} gregorian={gregorian} />
        )}
        {tab === "settings" && <PrayerSettings prayer={prayer} />}
      </main>
      <BottomNav tab={tab} setTab={setTab} isSubScreen={isSubScreen} />
    </div>
  );
}
