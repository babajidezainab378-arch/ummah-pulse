"use client";

import { useState } from "react";
import { Clock, Compass, MapPin, SlidersHorizontal } from "lucide-react";
import CityPicker from "@/components/worship/CityPicker";
import SectionHeading from "@/components/ui/SectionHeading";
import { ASR_SCHOOLS, CALC_METHODS } from "@/data/prayerOptions";
import type { PrayerEngine } from "@/hooks/usePrayerEngine";

interface PrayerSettingsProps {
  prayer: PrayerEngine;
}

/**
 * Reachable two ways: the gear icon inside Worship's prayer card, and
 * More → Prayer Settings. Same component, same state — changing a
 * setting here updates Home and Worship immediately.
 */
export default function PrayerSettings({ prayer }: PrayerSettingsProps) {
  const { location, settings, status, updateSettings, requestGPS, setManualCity } = prayer;
  const [pickingCity, setPickingCity] = useState(false);

  return (
    <div className="up-dash">
      <SectionHeading title="Prayer Settings" note="Location, calculation method and time format." />

      <section className="up-card">
        <div className="up-card-label">
          <MapPin size={15} />
          <span>Location</span>
        </div>
        <p className="up-reflection-text" style={{ marginBottom: 10 }}>
          {location ? location.label : "No location set yet."}
        </p>
        <div className="up-reflection-actions">
          <button className="up-chip-btn" onClick={requestGPS}>
            <MapPin size={14} /> Use my location
          </button>
          <button className="up-chip-btn" onClick={() => setPickingCity((v) => !v)}>
            Change city
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
      </section>

      <section className="up-card">
        <div className="up-card-label">
          <SlidersHorizontal size={15} />
          <span>Calculation Method</span>
        </div>
        <select
          className="up-select"
          value={settings.method}
          onChange={(e) => updateSettings({ method: Number(e.target.value) })}
        >
          {CALC_METHODS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
              {m.tag ? ` — ${m.tag}` : ""}
            </option>
          ))}
        </select>
        <p className="up-reflection-note" style={{ marginTop: 8 }}>
          No single method is universally correct — pick the one your local masjid follows. Egyptian General
          Authority of Survey is a common choice across Nigeria and West Africa.
        </p>
      </section>

      <section className="up-card">
        <div className="up-card-label">
          <Compass size={15} />
          <span>Asr Calculation</span>
        </div>
        <select
          className="up-select"
          value={settings.school}
          onChange={(e) => updateSettings({ school: Number(e.target.value) })}
        >
          {ASR_SCHOOLS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </section>

      <section className="up-card">
        <div className="up-card-label">
          <Clock size={15} />
          <span>Time Format</span>
        </div>
        <div className="up-reflection-actions">
          {(
            [
              ["12", "12-hour"],
              ["24", "24-hour"],
            ] as const
          ).map(([val, lbl]) => (
            <button
              key={val}
              className={"up-chip-btn" + (settings.timeFormat === val ? " up-chip-btn-active" : "")}
              onClick={() => updateSettings({ timeFormat: val })}
            >
              {lbl}
            </button>
          ))}
        </div>
      </section>

      {status === "ready" && (
        <p className="up-reflection-note" style={{ padding: "0 4px" }}>
          Prayer times are provided by the Al Adhan API and update automatically when you change these settings.
        </p>
      )}
    </div>
  );
}
