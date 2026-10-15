"use client";

import { Moon } from "lucide-react";
import CountdownUnit from "@/components/ui/CountdownUnit";
import { useNow } from "@/hooks/useNow";
import { RAMADAN_1448_END, RAMADAN_1448_START } from "@/lib/seasons/ramadan";
import { diffParts, pad2 } from "@/lib/prayer/format";

interface RamadanCountdownCardProps {
  active: boolean;
}

export default function RamadanCountdownCard({ active }: RamadanCountdownCardProps) {
  const now = useNow();
  const target = active ? RAMADAN_1448_END : RAMADAN_1448_START;
  const d = diffParts(target, now);

  return (
    <section className="up-card up-card-ramadan">
      <div className="up-ramadan-pattern" aria-hidden="true" />
      <div className="up-ramadan-content">
        <div className="up-card-label up-card-label-light">
          <Moon size={15} />
          <span>{active ? "Ramadan 1448 · in progress" : "Ramadan 1448"}</span>
        </div>
        <div className="up-countdown-row">
          <CountdownUnit value={d.days} label="days" />
          <CountdownUnit value={pad2(d.hours)} label="hrs" />
          <CountdownUnit value={pad2(d.minutes)} label="min" />
          <CountdownUnit value={pad2(d.seconds)} label="sec" />
        </div>
        <p className="up-ramadan-quote">
          {active ? '"Make the most of what remains."' : '"May Allah allow us to witness it."'}
        </p>
        <p className="up-ramadan-note">
          {active
            ? "Estimated end: March 9, 2027 — the exact date depends on moon sighting."
            : "Estimated start: February 8, 2027 — the exact date depends on moon sighting and may shift by a day."}
        </p>
      </div>
    </section>
  );
}
