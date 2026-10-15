import { ChevronRight, Sparkles } from "lucide-react";
import TodayCard from "@/components/calendar/TodayCard";
import { UPCOMING_OCCASIONS } from "@/data/occasions";
import { diffParts } from "@/lib/prayer/format";
import type { HijriDate } from "@/lib/calendar/hijri";

interface CalendarViewProps {
  hijri: HijriDate;
  hijriMonth: string;
  gregorian: string;
}

export default function CalendarView({ hijri, hijriMonth, gregorian }: CalendarViewProps) {
  const now = new Date();
  return (
    <div className="up-dash">
      <TodayCard hijriDay={hijri.day} hijriMonth={hijriMonth} hijriYear={hijri.year} gregorian={gregorian} />

      <section className="up-card">
        <div className="up-card-label">
          <Sparkles size={15} />
          <span>Upcoming Occasions</span>
        </div>
        <ul className="up-occasion-list">
          {UPCOMING_OCCASIONS.map((o) => {
            const d = diffParts(o.date, now);
            const Icon = o.icon;
            return (
              <li key={o.name} className="up-occasion-item">
                <span className="up-occasion-icon">
                  <Icon size={16} />
                </span>
                <div className="up-occasion-text">
                  <p className="up-occasion-name">{o.name}</p>
                  <p className="up-occasion-date">
                    {o.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    {" · "}
                    {d.days} days away
                  </p>
                </div>
                <ChevronRight size={16} className="up-occasion-chevron" />
              </li>
            );
          })}
        </ul>
        <p className="up-reflection-note" style={{ marginTop: 12 }}>
          Dates are estimates pending official moon sighting and will be easy to correct once confirmed.
        </p>
      </section>
    </div>
  );
}
