"use client";

import { ArrowUpRight } from "lucide-react";

interface LandingProps {
  onExplore: () => void;
  onReminder: () => void;
}

export default function Landing({ onExplore, onReminder }: LandingProps) {
  return (
    <div className="up-landing">
      <div className="up-landing-pattern" aria-hidden="true" />
      <div className="up-landing-inner">
        <span className="up-eyebrow-dot" aria-hidden="true" />
        <h1 className="up-hero-title">UmmahPulse</h1>
        <p className="up-hero-tagline">Little reminders. Big returns to Allah.</p>
        <p className="up-hero-sub">
          A gentle digital companion for your Qur&apos;an, salah, dhikr, du&apos;a and everyday journey back to Allah
          — built to be part of your year, not just your Ramadan.
        </p>
        <div className="up-hero-actions">
          <button className="up-btn-primary" onClick={onExplore}>
            Explore UmmahPulse
            <ArrowUpRight size={18} strokeWidth={2.25} />
          </button>
          <button className="up-btn-ghost" onClick={onReminder}>
            Today&apos;s Reminder
          </button>
        </div>
      </div>
    </div>
  );
}
