"use client";

import { Heart, Share2, Sparkles } from "lucide-react";

interface ReflectionCardProps {
  reflection: string;
  saved: boolean;
  onSave: () => void;
}

export default function ReflectionCard({ reflection, saved, onSave }: ReflectionCardProps) {
  return (
    <section className="up-card up-card-reminder">
      <div className="up-card-label">
        <Sparkles size={15} />
        <span>A Reminder for Today</span>
      </div>
      <p className="up-reflection-text">{reflection}</p>
      <p className="up-reflection-note">A reflection, not a quoted verse or hadith.</p>
      <div className="up-reflection-actions">
        <button className={"up-chip-btn" + (saved ? " up-chip-btn-active" : "")} onClick={onSave}>
          <Heart size={15} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save"}
        </button>
        <button className="up-chip-btn">
          <Share2 size={15} />
          Share
        </button>
      </div>
    </section>
  );
}
