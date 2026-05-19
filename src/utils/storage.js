import { achievements } from '../data/achievements';
import { lessons } from '../data/lessons';

const USER_KEY = 'eband_user';
const SESSION_KEY = 'eband_session';
const PROGRESS_KEY = 'eband_progress';

const defaultProgress = {
  completedLessons: [],
  points: 0,
  practiceMinutes: 0,
  streakDays: 1,
  achievements: [],
  tuningHistory: [],
  lastPracticeDate: null,
};

export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
}

export function setSession(email) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email, startedAt: new Date().toISOString() }));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getProgress() {
  return {
    ...defaultProgress,
    ...JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'),
  };
}

export function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function resetProgress() {
  saveProgress(defaultProgress);
}

export function ensureInitialProgress() {
  if (!localStorage.getItem(PROGRESS_KEY)) {
    saveProgress(defaultProgress);
  }
}

function applyAchievementRules(progress) {
  const unlocked = new Set(progress.achievements);
  const completedCount = progress.completedLessons.length;

  unlocked.add('first-login');
  if (completedCount >= 1) unlocked.add('first-lesson');
  if (completedCount >= 2) unlocked.add('two-lessons');
  if (completedCount >= lessons.length) unlocked.add('all-lessons');
  if (progress.practiceMinutes >= 30) unlocked.add('practice-30');
  if (progress.points >= 300) unlocked.add('points-300');

  return { ...progress, achievements: achievements.filter((item) => unlocked.has(item.id)).map((item) => item.id) };
}

export function completeLesson(lessonId) {
  const progress = getProgress();
  const lesson = lessons.find((item) => item.id === lessonId);
  if (!lesson || progress.completedLessons.includes(lessonId)) {
    return applyAchievementRules(progress);
  }

  const nextProgress = applyAchievementRules({
    ...progress,
    completedLessons: [...progress.completedLessons, lessonId],
    points: progress.points + lesson.points,
    practiceMinutes: progress.practiceMinutes + lesson.duration,
    lastPracticeDate: new Date().toISOString(),
  });

  saveProgress(nextProgress);
  return nextProgress;
}

export function addTuningRecord(record) {
  const progress = getProgress();
  const nextProgress = {
    ...progress,
    tuningHistory: [record, ...progress.tuningHistory].slice(0, 6),
  };
  saveProgress(nextProgress);
  return nextProgress;
}

export function getGeneralPercent(progress = getProgress()) {
  return Math.round((progress.completedLessons.length / lessons.length) * 100);
}
