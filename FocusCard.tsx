import { Compass } from "lucide-react";

export default function FocusCard() {
  return (
    <section className="up-card up-card-focus">
      <div className="up-card-label">
        <Compass size={15} />
        <span>Today&apos;s Focus</span>
      </div>
      <p className="up-focus-text">
        Try saying &quot;Alhamdulillah&quot; the next time something small goes right — before you say anything
        else.
      </p>
    </section>
  );
}
