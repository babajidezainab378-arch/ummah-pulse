interface SectionHeadingProps {
  title: string;
  note: string;
}

export default function SectionHeading({ title, note }: SectionHeadingProps) {
  return (
    <section className="up-greeting">
      <h2 className="up-greeting-main">{title}</h2>
      <p className="up-greeting-top" style={{ marginTop: 4 }}>
        {note}
      </p>
    </section>
  );
}
