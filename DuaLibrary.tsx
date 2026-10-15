import { Heart } from "lucide-react";
import { DUA_CATEGORIES } from "@/data/duaCategories";

export default function DuaLibrary() {
  return (
    <section className="up-card">
      <div className="up-card-label">
        <Heart size={15} />
        <span>Du'a Library</span>
      </div>
      <div className="up-dua-grid">
        {DUA_CATEGORIES.map((c) => (
          <span key={c} className="up-dua-chip">
            {c}
          </span>
        ))}
      </div>
      <p className="up-reflection-note" style={{ marginTop: 10 }}>
        Authentic Arabic, transliteration, translation and source for each du'a will appear here once sourced
        content is connected — nothing is fabricated in the meantime.
      </p>
    </section>
  );
}
