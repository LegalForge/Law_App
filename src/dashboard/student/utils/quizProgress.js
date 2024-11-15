export const QUIZ_PROGRESS_KEY = 'quiz_progress';

export const saveQuizProgress = (progress) => {
  localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
};

export const loadQuizProgress = () => {
  const saved = localStorage.getItem(QUIZ_PROGRESS_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const clearQuizProgress = () => {
  localStorage.removeItem(QUIZ_PROGRESS_KEY);
}; 