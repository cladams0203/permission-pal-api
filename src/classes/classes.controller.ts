import express, { Request, Response } from "express";
import permissionsService from "../middlewares/permissions.service";
import schoolsService from "../schools/schools.service";
import classesService from "./classes.service";

const router = express.Router();

router.get("/", permissionsService.superAdmin, async (req: Request, res: Response) => {
  try {
    const allClasses = await classesService.find();
    res.status(200).json(allClasses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const foundClass = await classesService.findById(+req.params.id);
    if (!foundClass) {
      res.status(404).json({ message: `Class with the id ${req.params.id} not found` });
    }
    res.status(200).json(classesService.serializeClass(foundClass));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/school/:id", async (req: Request, res: Response) => {
  try {
    const schoolClasses = await classesService.findAllBySchoolId(+req.params.id);
    const serializedClasses = schoolClasses.map((x) => classesService.serializeClass(x));
    res.status(200).json(serializedClasses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/teacher/:id", async (req: Request, res: Response) => {
  try {
    const teacherClasses = await classesService.findAllTeacherId(+req.params.id);
    const serializedClasses = teacherClasses.map((x) => classesService.serializeClass(x));
    res.status(200).json(serializedClasses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/student/:id", async (req: Request, res: Response) => {
  try {
    const studentClasses = await classesService.findAllByStudentId(+req.params.id);
    const serializedClasses = studentClasses.map((x) => classesService.serializeClass(x));
    res.status(200).json(serializedClasses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", permissionsService.teacherRole, async (req: Record<string, any>, res: Response) => {
  try {
    const foundClass = await classesService.findById(+req.params.id);
    if (req.teacher) {
      if (foundClass.teacher_id !== req.userId) {
        res.status(403).json({ message: "User is not authorized for this class" });
      }
    }
    const updatedClass = await classesService.update(+req.params.id, req.body);
    const serializedUpdate = classesService.serializeClass(updatedClass);
    res.status(203).json(serializedUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete(":id", permissionsService.teacherRole, async (req: Record<string, any>, res: Response) => {
  try {
    const foundClass = await classesService.findById(+req.params.id);
    if (req.teacher) {
      if (foundClass.teacher_id !== req.userId) {
        res.status(403).json({ message: "User is not authorized for this class" });
      }
    }
    await classesService.remove(+req.params.id);
    res.status(203).json({ message: `Class ${req.params.id} was deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
