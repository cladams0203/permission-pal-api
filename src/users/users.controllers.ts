import express, { Request, Response } from "express";
import userService from "./users.services";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
