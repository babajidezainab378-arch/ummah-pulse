"use client";

import { useState } from "react";
import { CURATED_CITIES } from "@/data/prayerOptions";

interface CityPickerProps {
  onPick: (city: string, country: string) => void;
}

export default function CityPicker({ onPick }: CityPickerProps) {
  const [selected, setSelected] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [customCountry, setCustomCountry] = useState("");

  return (
    <div className="up-city-picker">
      <select
        className="up-select"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          if (e.target.value && e.target.value !== "other") {
            const [city, country] = e.target.value.split("|");
            onPick(city, country);
          }
        }}
      >
        <option value="">Select a city…</option>
        {CURATED_CITIES.map((c) => (
          <option key={c.city} value={`${c.city}|${c.country}`}>
            {c.city}, {c.country}
          </option>
        ))}
        <option value="other">Other — enter manually</option>
      </select>

      {selected === "other" && (
        <div className="up-city-custom">
          <input
            className="up-input"
            placeholder="City"
            value={customCity}
            onChange={(e) => setCustomCity(e.target.value)}
          />
          <input
            className="up-input"
            placeholder="Country"
            value={customCountry}
            onChange={(e) => setCustomCountry(e.target.value)}
          />
          <button
            className="up-chip-btn up-chip-btn-active"
            disabled={!customCity || !customCountry}
            onClick={() => onPick(customCity, customCountry)}
          >
            Use this location
          </button>
        </div>
      )}
    </div>
  );
}
