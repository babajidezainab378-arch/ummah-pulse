"use client";

import { Heart, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { JourneyStore } from "@/hooks/useJourney";
import { dhikrRecentDays, dhikrToday } from "@/lib/storage/journey";

interface JourneyHubProps {
  journey: JourneyStore;
  now: Date;
}

/** "2026-10-15" -> "Thu, Oct 15" (parsed as a local date, not UTC). */
function formatDay(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

/**
 * Everything here comes from the saved journey store. Features that
 * don't exist yet say so plainly instead of showing sample numbers.
 */
export default function JourneyHub({ journey, now }: JourneyHubProps) {
  const { data, removeSavedReminder } = journey;
  const today = dhikrToday(data, now);
  const recent = dhikrRecentDays(data, 7);
  const reminders = data.savedReminders;

  const items = [
    { label: "Qur'an progress", value: "Not tracked yet" },
    { label: "Dhikr today", value: today === 0 ? "None yet" : `${today} counted` },
    { label: "Saved reminders", value: reminders.length === 0 ? "None yet" : `${reminders.length} saved` },
    { label: "Saved du'as", value: "Coming soon" },
    { label: "Saved stories", value: "Coming soon" },
    { label: "Personal goals", value: "Coming soon" },
  ];

  return (
    <div className="up-dash">
      <SectionHeading title="My Journey" note="Private to you." />

      <section className="up-card">
        <ul className="up-occasion-list">
          {items.map((it) => (
            <li key={it.label} className="up-occasion-item">
              <div className="up-occasion-text">
                <p className="up-occasion-name">{it.label}</p>
              </div>
              <span className="up-tag">{it.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="up-card">
        <div className="up-card-label">
          <Heart size={15} />
          <span>Saved reminders</span>
        </div>
        {reminders.length === 0 ? (
          <p className="up-reflection-note" style={{ margin: 0 }}>
            Tap Save on a reminder from Home and it will appear here.
          </p>
        ) : (
          <ul className="up-saved-list">
            {reminders.map((r) => (
              <li key={r.text} className="up-saved-item">
                <p className="up-saved-text">{r.text}</p>
                <button
                  className="up-icon-btn"
                  onClick={() => removeSavedReminder(r.text)}
                  aria-label="Remove saved reminder"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="up-card">
        <div className="up-card-label">
          <span>Dhikr history</span>
        </div>
        {recent.length === 0 ? (
          <p className="up-reflection-note" style={{ margin: 0 }}>
            Your daily dhikr totals will appear here after you use the counter in Worship.
          </p>
        ) : (
          <ul className="up-occasion-list">
            {recent.map(([day, total]) => (
              <li key={day} className="up-occasion-item">
                <div className="up-occasion-text">
                  <p className="up-occasion-name">{formatDay(day)}</p>
                </div>
                <span className="up-tag">{total}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="up-reflection-note" style={{ padding: "0 4px" }}>
        Everything here is saved only on this device, in this browser. Clearing your browser data will erase it.
        Sign-in and cloud sync can be added later.
      </p>
    </div>
  );
}
