import express, { Request, Response } from "express";
import userService from "./users.service";
import permissionsService from "../middlewares/permissions.service";
import { IUser } from "./users.types";
import studentsService from "../students/students.service";
import usersService from "./users.service";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.find();
    const serializedUsers = users.map(async (x: IUser) => {
      return await usersService.serializeUser(x);
    });
    res.status(200).json(await Promise.all(serializedUsers));
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

router.get("/parent/:id", async (req: Request, res: Response) => {
  try {
    const parent = await userService.findById(+req.params.id);
    const students = await studentsService.findAllByParentId(parent.id);
    res.status(200).json({
      ...(await userService.serializeUser(parent)),
      students,
    });
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

router.post("/parent/:id/student", async (req: Record<string, any>, res: Response) => {
  try {
    const parent = await userService.findById(+req.params.id);
    await userService.addStudentToParent(+req.body.student_id, parent.id);
    const students = await studentsService.findAllByParentId(parent.id);
    res.status(201).json({
      ...(await userService.serializeUser(parent)),
      students,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
