import { Link } from 'react-router-dom';
import { Award, CalendarDays, Gauge, Guitar, ListMusic, SlidersHorizontal, Timer, Trophy } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import StatCard from '../components/StatCard.jsx';
import { getGeneralPercent, getProgress, getUser } from '../utils/storage';

const quickLinks = [
  { to: '/lecciones', label: 'Lecciones', icon: ListMusic },
  { to: '/afinador', label: 'Afinador', icon: SlidersHorizontal },
  { to: '/metronomo', label: 'Metrónomo', icon: Timer },
  { to: '/progreso', label: 'Progreso', icon: Gauge },
  { to: '/progreso', label: 'Logros', icon: Trophy },
];

export default function Home() {
  const user = getUser();
  const progress = getProgress();
  const percent = getGeneralPercent(progress);

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <Logo compact />
          <h1>Hola, {user?.name || 'guitarrista'}</h1>
        </div>
        <Award size={30} />
      </header>

      <section className="banner">
        <div>
          <span>Ruta inicial</span>
          <h2>Sigue tu ritmo, toca tus sueños</h2>
          <p>{percent}% del camino completado</p>
        </div>
        <Guitar size={82} />
      </section>

      <section className="quick-grid">
        {quickLinks.map(({ to, label, icon: Icon }) => (
          <Link className="quick-card" to={to} key={label}>
            <Icon size={24} />
            <span>{label}</span>
          </Link>
        ))}
      </section>

      <section className="section-row">
        <ProgressRing value={percent} label="progreso" />
        <div className="stat-grid stat-grid--stack">
          <StatCard icon={CalendarDays} label="Racha" value={`${progress.streakDays} días`} />
          <StatCard icon={Timer} label="Práctica" value={`${progress.practiceMinutes} min`} />
          <StatCard icon={Trophy} label="Puntos" value={progress.points} />
        </div>
      </section>
    </div>
  );
}
