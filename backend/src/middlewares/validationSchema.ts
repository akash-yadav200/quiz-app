import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "USER"])?.default("USER"),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const newQuizSchema = z.object({
  quizName: z.string(),
});

export const questionAddSchema = z.object({
  question: z.string(),
  options: z.string().array(),
  answer: z.string(),
  quizId: z.string(),
});
export const getAnswerSchema = z.object({
  questionId: z.string(),
});
export const getQuestionSchema = z.object({
  questionId: z.string(),
});
