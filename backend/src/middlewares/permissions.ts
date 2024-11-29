import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenPayload } from "../types";

export const hasPermissionCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.trim().split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Permission denied" });
    return;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as tokenPayload;
    if (decoded.role === "ADMIN") {
      req.hasPermission = true;
      req.userName = decoded.email;
      next();
    } else {
      res.status(401).json({ message: "Permission denied" });
    }
  } catch (err) {
    res.status(401).json({ message: "Permission denied" });
  }
};
