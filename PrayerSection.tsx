"use client";

import { useState } from "react";
import { AlertTriangle, Clock, MapPin, RefreshCw, SlidersHorizontal } from "lucide-react";
import CityPicker from "@/components/worship/CityPicker";
import LocationPrompt from "@/components/worship/LocationPrompt";
import { CALC_METHODS } from "@/data/prayerOptions";
import { formatClock, formatCountdown } from "@/lib/prayer/format";
import type { PrayerEngine } from "@/hooks/usePrayerEngine";

interface PrayerSectionProps {
  prayer: PrayerEngine;
  onOpenSettings: () => void;
}

/** The "Today's Prayer" card inside Worship — full six-prayer schedule. */
export default function PrayerSection({ prayer, onOpenSettings }: PrayerSectionProps) {
  const { status, errorMsg, usingCache, location, schedule, next, now, settings, requestGPS, retry, setManualCity } =
    prayer;
  const [pickingCity, setPickingCity] = useState(false);

  return (
    <section className="up-card up-card-prayer-full">
      <div className="up-card-label">
        <Clock size={15} />
        <span>Today's Prayer</span>
        {status === "ready" && (
          <button className="up-icon-link" onClick={onOpenSettings} aria-label="Prayer settings">
            <SlidersHorizontal size={14} />
          </button>
        )}
      </div>

      {status === "no-location" && (
        <LocationPrompt onGPS={requestGPS} onPick={(city, country) => setManualCity(city, country)} />
      )}

      {status === "init" && (
        <p className="up-reflection-note" style={{ margin: 0 }}>
          Loading your preferences…
        </p>
      )}
      {status === "loading" && (
        <p className="up-reflection-note" style={{ margin: 0 }}>
          Fetching today's prayer times…
        </p>
      )}

      {status === "error" && (
        <>
          <p className="up-error-text">
            <AlertTriangle size={14} /> {errorMsg}
          </p>
          <div className="up-reflection-actions">
            <button className="up-chip-btn" onClick={retry}>
              <RefreshCw size={14} /> Try again
            </button>
            <button className="up-chip-btn" onClick={() => setPickingCity(true)}>
              <MapPin size={14} /> Choose a city
            </button>
          </div>
          {pickingCity && (
            <CityPicker
              onPick={(city, country) => {
                setManualCity(city, country);
                setPickingCity(false);
              }}
            />
          )}
        </>
      )}

      {status === "ready" && schedule && next && location && (
        <>
          <div className="up-today-row" style={{ marginBottom: 4 }}>
            <div>
              <p className="up-today-hijri" style={{ fontSize: "1rem" }}>
                {location.label}
              </p>
              <p className="up-today-greg">
                {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>
            {usingCache && <span className="up-tag">cached · offline</span>}
          </div>

          <div className="up-nextprayer-banner">
            <div>
              <p className="up-nextprayer-label">Next Prayer</p>
              <p className="up-nextprayer-name">
                {next.key}
                {next.isTomorrow ? " (tomorrow)" : ""}
              </p>
            </div>
            <p className="up-nextprayer-countdown">{formatCountdown(next.date.getTime() - now.getTime())}</p>
          </div>

          <ul className="up-prayer-list">
            {schedule.map((p) => {
              const isNext = p.key === next.key && !next.isTomorrow;
              return (
                <li key={p.key} className={"up-prayer-list-row" + (isNext ? " up-prayer-list-row-active" : "")}>
                  <span>{p.key}</span>
                  <span className="up-prayer-list-time">{formatClock(p.date, settings.timeFormat)}</span>
                </li>
              );
            })}
          </ul>

          <p className="up-reflection-note" style={{ marginTop: 10 }}>
            Source: Al Adhan API · {CALC_METHODS.find((m) => m.id === settings.method)?.name || "custom method"}
          </p>
        </>
      )}
    </section>
  );
}
