import express, { Request, Response } from "express";
import permissionsService from "../middlewares/permissions.service";
import schoolsService from "../schools/schools.service";
import studentsService from "../students/students.service";
import usersService from "../users/users.service";
import classesService from "./classes.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
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
    const teacher = usersService.serializeUser(await usersService.findById(foundClass.teacher_id));
    const students = studentsService.findAllByClassId(foundClass.id);
    res.status(200).json({
      ...classesService.serializeClass(foundClass),
      teacher,
      students: students,
    });
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

router.put("/:id", async (req: Record<string, any>, res: Response) => {
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

router.delete(":id", async (req: Record<string, any>, res: Response) => {
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

router.post("/", async (req: Record<string, any>, res: Response) => {
  try {
    const newClass = await classesService.insert(req.body);
    const teacher = await usersService.findById(newClass.teacher_id);
    res.status(201).json({ ...classesService.serializeClass(newClass), teacher });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/:id/students", async (req: Record<string, any>, res: Response) => {
  try {
    const foundClass = await classesService.findById(+req.params.id);
    if (!foundClass) res.status(404).json({ message: `Class ${req.params.id} not found` });
    const studentIds: number[] = req.body;
    const mappedDTO = studentIds.map((x) => ({ student_id: x, class_id: foundClass.id }));
    const addedStudents = studentsService.addStudentsToClass(mappedDTO, +req.params.id);
    res.status(201).json({
      ...classesService.serializeClass(foundClass),
      students: addedStudents,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
