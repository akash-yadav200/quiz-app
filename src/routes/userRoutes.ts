import { Quiz } from "./../../node_modules/.prisma/client/index.d";
import { Router, Request } from "express";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import {
  userRegistrationSchema,
  userLoginSchema,
  questionAddSchema,
  getAnswerSchema,
  getQuestionSchema,
  newQuizSchema,
} from "../middlewares/validationSchema";
import { hasPermissionCheck } from "../middlewares/permissions";
import prisma from "../database/db";

const userRoutes = Router();

userRoutes.post("/register", async (req, res) => {
  const response = userRegistrationSchema.safeParse(req.body);
  if (!response.success) {
    res.status(400).json({ message: "Invalid data", errors: response.error });
    return;
  }
  const role = response.data.role ? response.data.role : "USER";
  try {
    const hashePassword = bcrypt.hashSync(response.data.password, 10);
    const user = {
      email: response.data.email,
      password: hashePassword,
      name: response.data.name,
      role,
    };

    const newUser = await prisma.user.create({
      data: user,
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", err });
  }
});

userRoutes.post("/login", async (req, res) => {
  const response = userLoginSchema.safeParse(req.body);
  if (!response.success) {
    res
      .status(400)
      .json({ message: "Invalid Email or Password", errors: response.error });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: response.data.email,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      response.data.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Incorrect Password" });
      return;
    }
    const userToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string
    );
    res
      .status(200)
      .json({ message: "Login successful", token: `Bearer ${userToken}` });
  } catch (err) {
    res.status(500).json({ message: "Error while login : ", err });
  }
});
userRoutes.post(
  "/quiz/addquiz",
  hasPermissionCheck,
  async (req: Request, res) => {
    const response = newQuizSchema.safeParse(req.body);
    if (!response.success || !req.userName) {
      res.status(403).json({ message: "unable to create quiz" });
      return;
    }

    try {
      const quiz = await prisma.quiz.create({
        data: {
          quizName: response.data.quizName,
          createdBy: req.userName,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "error while creating quiz", error });
    }
  }
);
userRoutes.post(
  "/question/add",
  hasPermissionCheck,
  async (req: Request, res) => {
    const response = questionAddSchema.safeParse(req.body);
    if (!response.success) {
      res.status(400).json({ message: "Invalid data", errors: response.error });
      return;
    }
    const { question, options, answer, quizId } = response.data;
    const isValidQuiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
    });
    if (!isValidQuiz) {
      res.status(400).json({ message: "Invalid quiz id" });
      return;
    }

    try {
      const newQuestion = await prisma.question.create({
        data: {
          question,
          quizId,
        },
      });
      const optionsData = options.map((option) => ({
        answer: option,
        questionId: newQuestion.id,
        isCorrect: option === answer,
      }));
      const newOptions = await prisma.answer.createMany({
        data: optionsData,
      });
      res.status(201).json({
        message: "Question created successfully",
      });
    } catch (err) {
      res.status(500).json({ message: "Error creating question", err });
    }
  }
);
userRoutes.get("/question/all", async (req, res) => {
  try {
    const questions = await prisma.question.findMany();

    res.status(201).json({
      questions,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating question", err });
  }
});
userRoutes.get("/answer/all", async (req, res) => {
  try {
    const answers = await prisma.answer.findMany();

    res.status(201).json({
      answers,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating question", err });
  }
});
userRoutes.get("/question/getquestion", async (req, res) => {
  const response = getQuestionSchema.safeParse(req.params);
  if (!response.success) {
    res.status(400).json({ message: "Invalid data", errors: response.error });
    return;
  }
  try {
    const question = await prisma.question.findFirst({
      where: {
        id: response.data.questionId,
      },
    });
    res.status(200).json({ question });
  } catch (err) {
    res.status(500).json({ message: "Error creating question", err });
  }
});
userRoutes.get("/answer/getanswer", async (req, res) => {
  const response = getAnswerSchema.safeParse(req.params);
  if (!response.success) {
    res.status(400).json({ message: "Invalid data", errors: response.error });
    return;
  }
  try {
    const answer = await prisma.answer.findFirst({
      where: {
        questionId: response.data.questionId,
        isCorrect: true,
      },
    });
    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ message: "Error creating question", err });
  }
});

export default userRoutes;
