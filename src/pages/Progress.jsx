import { Award, BookOpenCheck, Clock3, Trophy } from 'lucide-react';
import ProgressRing from '../components/ProgressRing.jsx';
import StatCard from '../components/StatCard.jsx';
import { achievements } from '../data/achievements';
import { categories, lessons } from '../data/lessons';
import { getGeneralPercent, getProgress } from '../utils/storage';

export default function Progress() {
  const progress = getProgress();
  const percent = getGeneralPercent(progress);
  const unlocked = new Set(progress.achievements);

  function categoryPercent(category) {
    const categoryLessons = lessons.filter((lesson) => lesson.category === category);
    const completed = categoryLessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
    return Math.round((completed / Math.max(1, categoryLessons.length)) * 100);
  }

  return (
    <div className="page">
      <header className="page-header">
        <span>Indicadores EBAND</span>
        <h1>Progreso</h1>
      </header>

      <section className="progress-summary">
        <ProgressRing value={percent} label="general" />
        <div className="stat-grid stat-grid--stack">
          <StatCard icon={BookOpenCheck} label="Lecciones" value={`${progress.completedLessons.length}/${lessons.length}`} />
          <StatCard icon={Clock3} label="Tiempo" value={`${progress.practiceMinutes} min`} />
          <StatCard icon={Trophy} label="Puntos" value={progress.points} />
        </div>
      </section>

      <section className="category-card">
        <h2>Barras por categoría</h2>
        {categories.map((category) => {
          const value = categoryPercent(category);
          return (
            <div className="progress-line" key={category}>
              <div>
                <span>{category}</span>
                <strong>{value}%</strong>
              </div>
              <progress value={value} max="100" />
            </div>
          );
        })}
      </section>

      <section className="achievements-grid">
        {achievements.map((item) => (
          <article className={`achievement ${unlocked.has(item.id) ? 'unlocked' : ''}`} key={item.id}>
            <Award size={22} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
