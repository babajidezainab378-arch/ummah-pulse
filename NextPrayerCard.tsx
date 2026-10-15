"use client";

import { AlertTriangle, Clock, MapPin, RefreshCw } from "lucide-react";
import { formatClock, formatCountdown } from "@/lib/prayer/format";
import type { PrayerEngine } from "@/hooks/usePrayerEngine";

interface NextPrayerCardProps {
  prayer: PrayerEngine;
}

/** Home's prayer summary — next prayer only. Full schedule lives in Worship. */
export default function NextPrayerCard({ prayer }: NextPrayerCardProps) {
  const { status, errorMsg, usingCache, location, next, now, settings, requestGPS, retry } = prayer;

  if (status === "init") {
    return (
      <section className="up-card up-card-prayer">
        <div className="up-card-label">
          <Clock size={15} />
          <span>Next Prayer</span>
        </div>
        <p className="up-reflection-note" style={{ margin: 0 }}>
          Loading your preferences…
        </p>
      </section>
    );
  }

  if (status === "no-location") {
    return (
      <section className="up-card up-card-prayer">
        <div className="up-card-label">
          <Clock size={15} />
          <span>Next Prayer</span>
        </div>
        <p className="up-reflection-text" style={{ marginBottom: 12 }}>
          Add your location to see accurate prayer times here.
        </p>
        <div className="up-reflection-actions">
          <button className="up-chip-btn up-chip-btn-active" onClick={requestGPS}>
            <MapPin size={14} /> Use my location
          </button>
        </div>
      </section>
    );
  }

  if (status === "loading") {
    return (
      <section className="up-card up-card-prayer">
        <div className="up-card-label">
          <Clock size={15} />
          <span>Next Prayer</span>
        </div>
        <p className="up-reflection-note" style={{ margin: 0 }}>
          Fetching today's prayer times…
        </p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="up-card up-card-prayer">
        <div className="up-card-label">
          <Clock size={15} />
          <span>Next Prayer</span>
        </div>
        <p className="up-error-text">
          <AlertTriangle size={14} /> {errorMsg}
        </p>
        <button className="up-chip-btn" onClick={retry}>
          <RefreshCw size={14} /> Try again
        </button>
      </section>
    );
  }

  if (!next || !location) return null;

  const remaining = next.date.getTime() - now.getTime();
  return (
    <section className="up-card up-card-prayer">
      <div className="up-card-label">
        <Clock size={15} />
        <span>Next Prayer</span>
        {usingCache && <span className="up-tag">showing cached times</span>}
      </div>
      <div className="up-prayer-row">
        <div>
          <p className="up-prayer-name">
            {next.key}
            {next.isTomorrow ? " (tomorrow)" : ""}
          </p>
          <p className="up-prayer-time">{formatClock(next.date, settings.timeFormat)}</p>
        </div>
        <div className="up-prayer-countdown">
          <span className="up-prayer-countdown-value">{formatCountdown(remaining)}</span>
          <span className="up-tag">{location.label}</span>
        </div>
      </div>
    </section>
  );
}
