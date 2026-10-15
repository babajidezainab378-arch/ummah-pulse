import { Feather, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Stories lives inside Community now: the fiction itself, plus the
 * discussion layer on top of it. Submissions are moderated before
 * publication — there's no unrestricted public posting.
 */
export default function CommunityHub() {
  return (
    <div className="up-dash">
      <SectionHeading title="Community" note="Stories, discussion, and reactions — all moderated before anything posts." />

      <section className="up-card up-card-story-feature">
        <span className="up-tag" style={{ marginBottom: 10 }}>
          fiction · coming soon
        </span>
        <p className="up-story-eyebrow">Tonight on UmmahPulse</p>
        <p className="up-story-title">The Road Back — Episode 04</p>
        <p className="up-reflection-note">
          Serialized original fiction, released episode by episode. Never presented as Qur&apos;an, hadith, or
          historical narration.
        </p>
      </section>

      <section className="up-card">
        <div className="up-card-label">
          <Feather size={15} />
          <span>What&apos;s coming</span>
        </div>
        <p className="up-focus-text">
          Featured and new stories, continue-reading, saving/favouriting, and a share option — plus discussion,
          reactions and moderated story submissions, once Community opens.
        </p>
      </section>

      <section className="up-card">
        <div className="up-card-label">
          <Users size={15} />
          <span>How moderation works</span>
        </div>
        <p className="up-focus-text">
          Nothing posts publicly without review. Community-submitted stories go through moderation before
          they're visible to anyone else.
        </p>
      </section>
    </div>
  );
}
