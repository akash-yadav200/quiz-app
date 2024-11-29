import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { useNavigate } from 'react-router-dom';

export function QuizList() {
  const quizzes = useQuizStore((state) => state.quizzes);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Quizzes</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              {quiz.questions.length} questions
            </p>
            <button
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Start Quiz
            </button>
          </div>
        ))}
        {quizzes.length === 0 && (
          <p className="text-gray-500 col-span-2 text-center">
            No quizzes available yet.
          </p>
        )}
      </div>
    </div>
  );
}