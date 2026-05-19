import { Guitar, Music2 } from 'lucide-react';

export default function Logo({ compact = false }) {
  return (
    <div className={`logo ${compact ? 'logo--compact' : ''}`} aria-label="EBAND">
      <span className="logo__mark">
        <Guitar size={compact ? 22 : 32} strokeWidth={2.4} />
      </span>
      <span>
        EBAND
        {!compact && <Music2 size={18} className="logo__note" />}
      </span>
    </div>
  );
}
