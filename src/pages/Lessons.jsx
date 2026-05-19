import { useState } from 'react';
import { CheckCircle2, CirclePlay, LockKeyhole, Star } from 'lucide-react';
import { lessons } from '../data/lessons';
import { completeLesson, getProgress } from '../utils/storage';

export default function Lessons() {
  const [progress, setProgress] = useState(getProgress());
  const [activeLesson, setActiveLesson] = useState(null);

  function handleComplete(lessonId) {
    setActiveLesson(lessonId);
    window.setTimeout(() => {
      setProgress(completeLesson(lessonId));
      setActiveLesson(null);
    }, 650);
  }

  return (
    <div className="page">
      <header className="page-header">
        <span>Ruta por niveles</span>
        <h1>Lecciones</h1>
      </header>

      <div className="level-tabs">
        {[1, 2, 3, 4].map((level) => (
          <span key={level} className={progress.completedLessons.length + 1 >= level ? 'enabled' : ''}>
            Nivel {level}
          </span>
        ))}
      </div>

      <section className="lesson-list">
        {lessons.map((lesson) => {
          const completed = progress.completedLessons.includes(lesson.id);
          const locked = lesson.level > progress.completedLessons.length + 1;
          return (
            <article className={`lesson-card ${completed ? 'completed' : ''}`} key={lesson.id}>
              <div className="lesson-level">{completed ? <CheckCircle2 size={24} /> : <Star size={22} />} Nivel {lesson.level}</div>
              <h2>{lesson.title}</h2>
              <p>{lesson.description}</p>
              <div className="lesson-meta">
                <span>{lesson.duration} min</span>
                <span>{lesson.points} pts</span>
              </div>
              <button
                className="primary-button compact-button"
                type="button"
                disabled={completed || locked || activeLesson === lesson.id}
                onClick={() => handleComplete(lesson.id)}
              >
                {locked ? <LockKeyhole size={17} /> : <CirclePlay size={17} />}
                {completed ? 'Completada' : activeLesson === lesson.id ? 'Guardando...' : locked ? 'Bloqueada' : 'Iniciar'}
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}
