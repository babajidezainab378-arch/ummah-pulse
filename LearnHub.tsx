import { ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { LEARN_CATEGORIES } from "@/data/learnCategories";

export default function LearnHub() {
  return (
    <div className="up-dash">
      <SectionHeading title="Learn" note="Sourced articles, lessons and history — nothing invented." />
      <section className="up-card">
        <ul className="up-occasion-list">
          {LEARN_CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.name} className="up-occasion-item">
                <span className="up-occasion-icon">
                  <Icon size={16} />
                </span>
                <div className="up-occasion-text">
                  <p className="up-occasion-name">{c.name}</p>
                  <p className="up-occasion-date">Sourced content coming soon</p>
                </div>
                <ChevronRight size={16} className="up-occasion-chevron" />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
