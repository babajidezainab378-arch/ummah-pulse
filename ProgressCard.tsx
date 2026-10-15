import type { IconComponent } from "@/types";

interface ProgressCardProps {
  icon: IconComponent;
  label: string;
  value: string;
  total: string;
  fraction: number; // 0..1
}

export default function ProgressCard({ icon: Icon, label, value, total, fraction }: ProgressCardProps) {
  const pct = Math.round(fraction * 100);
  return (
    <div className="up-card up-progress-card">
      <div className="up-card-label">
        <Icon size={15} />
        <span>{label}</span>
      </div>
      <p className="up-progress-value">
        {value} <span className="up-progress-total">{total}</span>
      </p>
      <div className="up-progress-track">
        <div className="up-progress-fill" style={{ width: pct + "%" }} />
      </div>
    </div>
  );
}
