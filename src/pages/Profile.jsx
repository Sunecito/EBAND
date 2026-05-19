import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, RefreshCcw, UserRound } from 'lucide-react';
import { achievements } from '../data/achievements';
import { lessons } from '../data/lessons';
import { clearSession, getProgress, getUser, resetProgress } from '../utils/storage';

export default function Profile() {
  const navigate = useNavigate();
  const user = getUser();
  const [progress, setProgress] = useState(getProgress());
  const level = Math.min(4, progress.completedLessons.length + 1);

  function logout() {
    clearSession();
    navigate('/');
  }

  function handleReset() {
    resetProgress();
    setProgress(getProgress());
  }

  return (
    <div className="page">
      <header className="page-header">
        <span>Cuenta local</span>
        <h1>Perfil</h1>
      </header>

      <section className="profile-card">
        <div className="avatar">
          <UserRound size={42} />
        </div>
        <h2>{user?.name || 'Usuario EBAND'}</h2>
        <p>{user?.email}</p>
        <span className="level-pill">Nivel actual {level}</span>
      </section>

      <section className="profile-metrics">
        <div>
          <strong>{progress.completedLessons.length}/{lessons.length}</strong>
          <span>Lecciones</span>
        </div>
        <div>
          <strong>{progress.achievements.length}/{achievements.length}</strong>
          <span>Logros</span>
        </div>
        <div>
          <strong>{progress.points}</strong>
          <span>Puntos</span>
        </div>
      </section>

      <div className="button-stack">
        <button className="secondary-button" type="button" onClick={handleReset}>
          <RefreshCcw size={18} /> Reiniciar progreso
        </button>
        <button className="danger-button" type="button" onClick={logout}>
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}
