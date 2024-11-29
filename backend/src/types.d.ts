import { Request } from "express";
export interface AuthResponse {
  token: string;
}
export interface Question {
  id: string;
  question: string;
  options: string[];
}

export interface Answer {
  id: string;
  answer: string;
  isCorrect: boolean;
  questionId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}
export interface tokenPayload {
  id: string;
  email: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    hasPermission?: boolean;
    userName?: string;
  }
}
