"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import CityPicker from "@/components/worship/CityPicker";

interface LocationPromptProps {
  onGPS: () => void;
  onPick: (city: string, country: string) => void;
}

export default function LocationPrompt({ onGPS, onPick }: LocationPromptProps) {
  const [pickingCity, setPickingCity] = useState(false);

  return (
    <div>
      <p className="up-reflection-text" style={{ marginBottom: 12 }}>
        UmmahPulse needs a location to show real prayer times. Nothing is shared beyond this device.
      </p>
      <div className="up-reflection-actions">
        <button className="up-chip-btn up-chip-btn-active" onClick={onGPS}>
          <MapPin size={14} /> Use my location
        </button>
        <button className="up-chip-btn" onClick={() => setPickingCity((v) => !v)}>
          Choose a city instead
        </button>
      </div>
      {pickingCity && (
        <CityPicker
          onPick={(city, country) => {
            onPick(city, country);
            setPickingCity(false);
          }}
        />
      )}
    </div>
  );
}
