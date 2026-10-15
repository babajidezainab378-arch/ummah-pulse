import type { IconComponent } from "@/types";

interface PlaceholderProps {
  title: string;
  note: string;
  icon: IconComponent;
}

export default function Placeholder({ title, note, icon: Icon }: PlaceholderProps) {
  return (
    <div className="up-placeholder">
      <div className="up-placeholder-icon">
        <Icon size={22} />
      </div>
      <h3>{title}</h3>
      <p>{note}</p>
    </div>
  );
}
