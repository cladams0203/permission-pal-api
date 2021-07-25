import express, { Request, Response } from "express";
import userService from "./users.service";
import permissionsService from "../middlewares/permissions.service";
import { IUser } from "./users.types";
const router = express.Router();

router.get("/", permissionsService.superAdmin, async (req: Request, res: Response) => {
  try {
    const users = await userService.find();
    const serializedUsers = users.map(async (user: IUser) => {
      return { ...(await userService.serializeUser(user)), created_at: user.created_at, updated_at: user.updated_at };
    });
    res.status(200).json(serializedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userService.findById(+req.params.id);
    if (!user) {
      res.status(404).json({ message: `User with the id: ${req.params.id} not found` });
    }
    const serializedUser = await userService.serializeUser(user);
    res.status(200).json(serializedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.update(+req.params.id, req.body);
    const serializedUser = await userService.serializeUser(updatedUser);
    res.status(201).json(serializedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
