import { create } from 'zustand';
import { Quiz } from '../types';

interface QuizState {
  quizzes: Quiz[];
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizzes: [],
  addQuiz: (quiz) =>
    set((state) => ({
      quizzes: [
        ...state.quizzes,
        {
          ...quiz,
          id: Math.random().toString(36).substring(7),
        },
      ],
    })),
}));