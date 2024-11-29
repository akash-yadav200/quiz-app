export interface User {
  id: string;
  username: string;
  password: string;
  role: "user" | "admin";
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdBy: string;
}
