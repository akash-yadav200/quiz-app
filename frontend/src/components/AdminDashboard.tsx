import React, { useState } from 'react';
import { useQuizStore } from '../store/quizStore';
import { Question } from '../types';

export function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const addQuiz = useQuizStore((state) => state.addQuiz);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substring(7),
      text: currentQuestion,
      options: [...options],
      correctAnswer,
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addQuiz({
      title,
      description,
      questions,
      createdBy: 'admin',
    });
    setTitle('');
    setDescription('');
    setQuestions([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-4">Add Questions</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Question text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswer === index}
                  onChange={() => setCorrectAnswer(index)}
                  className="mt-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Question
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Added Questions:</h3>
          <ul className="list-disc pl-5">
            {questions.map((q) => (
              <li key={q.id} className="mb-2">
                {q.text}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          disabled={questions.length === 0}
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}