export default function ProgressRing({ value, label }) {
  const angle = Math.min(100, Math.max(0, value)) * 3.6;
  return (
    <div className="progress-ring" style={{ '--angle': `${angle}deg` }}>
      <div>
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}
