import { CalendarDays } from "lucide-react";

interface TodayCardProps {
  hijriDay: number;
  hijriMonth: string;
  hijriYear: number;
  gregorian: string;
}

export default function TodayCard({ hijriDay, hijriMonth, hijriYear, gregorian }: TodayCardProps) {
  return (
    <section className="up-card up-card-today">
      <div className="up-card-label">
        <CalendarDays size={15} />
        <span>Today</span>
      </div>
      <div className="up-today-row">
        <div>
          <p className="up-today-hijri">
            {hijriDay} {hijriMonth} {hijriYear} AH
          </p>
          <p className="up-today-greg">{gregorian}</p>
        </div>
        <span className="up-tag">calculated estimate</span>
      </div>
      <p className="up-reflection-note" style={{ marginTop: 10, marginBottom: 0 }}>
        Not an official moon-sighting announcement — the confirmed date may differ by a day.
      </p>
    </section>
  );
}
