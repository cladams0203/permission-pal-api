import jwt from "jsonwebtoken";
import { ISeriealizedUser } from "./users.types";
import { Request, Response, NextFunction } from "express";
import { configService } from "../config.service";

export const generateToken = (user: ISeriealizedUser): string => {
  const payload = {
    userId: user.id,
  };
  const options = {
    expiresIn: "364d",
  };

  return jwt.sign(payload, configService.getJwtSecret() ?? "", options);
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, configService.getJwtSecret() ?? "", (err) => {
      if (err) {
        res.status(401).json({ message: "Auth token is invalid" });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No auth token provided" });
  }
};
