"use client";

import { RotateCcw, Sparkles } from "lucide-react";
import { DHIKR_TARGETS, dhikrToday } from "@/lib/storage/journey";
import type { JourneyStore } from "@/hooks/useJourney";

interface DhikrCounterProps {
  journey: JourneyStore;
}

/** Counter UI only — the count itself lives in the shared, saved journey store. */
export default function DhikrCounter({ journey }: DhikrCounterProps) {
  const { data, tapDhikr, resetDhikr, changeDhikrTarget } = journey;
  const { count, target } = data.dhikr;
  const pct = Math.min(100, Math.round((count / target) * 100));
  const today = dhikrToday(data, new Date());

  return (
    <section className="up-card up-card-dhikr">
      <div className="up-card-label">
        <Sparkles size={15} />
        <span>Dhikr</span>
      </div>
      <p className="up-dhikr-phrase">SubhanAllah</p>
      <button className="up-dhikr-count" onClick={tapDhikr} aria-label={`Dhikr count ${count} of ${target}. Tap to add one.`}>
        {count}
        <span className="up-dhikr-target">/ {target}</span>
      </button>
      <div className="up-progress-track" style={{ marginTop: 12 }}>
        <div className="up-progress-fill" style={{ width: pct + "%" }} />
      </div>
      <div className="up-dhikr-actions">
        {DHIKR_TARGETS.map((t) => (
          <button
            key={t}
            className={"up-chip-btn" + (target === t ? " up-chip-btn-active" : "")}
            onClick={() => changeDhikrTarget(t)}
          >
            {t}
          </button>
        ))}
        <button className="up-chip-btn" onClick={resetDhikr}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>
      <p className="up-reflection-note up-dhikr-today">
        {today} counted today · saved on this device
      </p>
    </section>
  );
}
