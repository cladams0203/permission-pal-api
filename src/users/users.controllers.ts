import express, { Request, Response } from "express";
import userService from "./users.service";
import permissionsService from "../middlewares/permissions.service";
const router = express.Router();

router.get("/", permissionsService.superAdmin, async (req: Request, res: Response) => {
  try {
    const users = await userService.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.update(+req.params.id, req.body);
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
