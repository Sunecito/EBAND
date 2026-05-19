import { NavLink, Outlet } from 'react-router-dom';
import { Home, ListMusic, SlidersHorizontal, Timer, UserRound } from 'lucide-react';

const navItems = [
  { to: '/home', label: 'Inicio', icon: Home },
  { to: '/lecciones', label: 'Lecciones', icon: ListMusic },
  { to: '/afinador', label: 'Afinador', icon: SlidersHorizontal },
  { to: '/metronomo', label: 'Metrónomo', icon: Timer },
  { to: '/perfil', label: 'Perfil', icon: UserRound },
];

export default function AppLayout() {
  return (
    <main className="app-shell">
      <section className="phone-frame">
        <div className="screen-content">
          <Outlet />
        </div>
        <nav className="bottom-nav" aria-label="Navegación principal">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={21} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </section>
    </main>
  );
}
