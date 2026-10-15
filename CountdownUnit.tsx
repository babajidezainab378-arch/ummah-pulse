interface CountdownUnitProps {
  value: string | number;
  label: string;
}

export default function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="up-countdown-unit">
      <span className="up-countdown-value">{value}</span>
      <span className="up-countdown-label">{label}</span>
    </div>
  );
}
