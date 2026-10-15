"use client";

import { ChevronRight, Moon } from "lucide-react";

interface SeasonTeaserProps {
  daysToRamadan?: number;
  onOpenCalendar: () => void;
}

export default function SeasonTeaser({ daysToRamadan, onOpenCalendar }: SeasonTeaserProps) {
  return (
    <button className="up-card up-season-teaser" onClick={onOpenCalendar}>
      <span className="up-season-teaser-icon">
        <Moon size={16} />
      </span>
      <span className="up-season-teaser-text">
        <span className="up-season-teaser-title">Ramadan 1448</span>
        <span className="up-season-teaser-sub">
          {daysToRamadan && daysToRamadan > 0 ? `${daysToRamadan} days away · estimated` : "estimated"}
        </span>
      </span>
      <ChevronRight size={16} className="up-occasion-chevron" />
    </button>
  );
}
