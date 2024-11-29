import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';

export function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quiz = useQuizStore((state) => 
    state.quizzes.find((q) => q.id === id)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <p className="text-lg mb-4">
            Your score: {score} out of {quiz.questions.length}
          </p>
          <p className="text-lg mb-4">
            Percentage: {((score / quiz.questions.length) * 100).toFixed(1)}%
          </p>
          <button
            onClick={() => navigate('/quizzes')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-4">{question.text}</h2>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-3 text-left rounded-md ${
                answers[currentQuestion] === index
                  ? 'bg-indigo-100 border-indigo-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border transition-colors`}
            >
              {option}
            </button>
          ))}
        </div>
        {currentQuestion === quiz.questions.length - 1 && (
          <button
            onClick={handleFinish}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={answers.length !== quiz.questions.length}
          >
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
}