import express, { Request, Response } from "express";
import classesService from "../classes/classes.service";
import permissionsService from "../middlewares/permissions.service";
import schoolsService from "../schools/schools.service";
import teachers_schoolsService from "../teachers_schools/teachers_schools.service";
import formsService from "./forms.service";
import { FormDTO } from "./forms.types";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allForms = await formsService.find();
    res.status(200).json(allForms);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const form = await formsService.findById(+req.params.id);
    if (!form) {
      res.status(404).json({ message: `Form ${req.params.id} not found` });
    }
    res.status(200).json(formsService.serializeForm(form));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/master/:id", async (req: Record<string, any>, res: Response) => {
  try {
    const masterForm = await formsService.findById(+req.params.id);
    if (masterForm.school_id) {
      if (req.permission_level <= 100) {
        const masterForms = await formsService.findAllByMasterId(+req.params.id);
        res.status(200).json(masterForms);
      } else if (req.permission_level <= 200) {
        const school = schoolsService.findBySchoolAdminId(+req.userId);
        if (!school) {
          res.status(403).json({ message: `User is not authorized for this school's forms` });
        }
        const masterForms = await formsService.findAllByMasterId(+req.params.id);
        res.status(200).json(masterForms.map((x) => formsService.serializeForm(x)));
      } else {
        const teacherSchoolIds = (await teachers_schoolsService.findAllSchoolsByTeacherId(+req.userId)).map((x) => x.id);
        if (teacherSchoolIds.includes(masterForm.school_id)) {
          const masterForms = await formsService.findAllByMasterId(+req.params.id);
          res.status(200).json(masterForms.map((x) => formsService.serializeForm(x)));
        } else {
          res.status(403).json({ message: `User is not authorized for this school's forms` });
        }
      }
    } else {
      res.status(200).json(await formsService.findAllByMasterId(+req.params.id));
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/school/:id", async (req: Record<string, any>, res: Response) => {
  try {
    if (req.permission_level <= 100) {
      const schoolForms = await formsService.findAllBySchoolId(+req.params.id);
      res.status(200).json(schoolForms);
    } else {
      const school = await schoolsService.findById(+req.params.id);
      if (school.school_admin_id === +req.userId) {
        const schoolForms = await formsService.findAllBySchoolId(+req.params.id);
        res.status(200).json(schoolForms.map((x) => formsService.serializeForm(x)));
      } else {
        res.status(403).json({ message: `User is not school admin` });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/class/:id", async (req: Record<string, any>, res: Response) => {
  try {
    if (req.permission_level <= 100) {
      const classForms = await formsService.findAllByClassId(+req.params.id);
      res.status(200).json(classForms);
    } else {
      const classroom = await classesService.findById(+req.params.id);
      const school = await schoolsService.findById(classroom.school_id);
      if (req.permission_level <= 200) {
        if (school.school_admin_id === +req.userId) {
          const classForms = await formsService.findAllByClassId(+req.params.id);
          res.status(200).json(classForms.map((x) => formsService.serializeForm(x)));
        } else {
          res.status(403).json({ message: `User is not school admin` });
        }
      } else {
        const classroom = await classesService.findById(+req.params.id);
        if (classroom.teacher_id === +req.userId) {
          const classForms = await formsService.findAllByClassId(+req.params.id);
          res.status(200).json(classForms.map((x) => formsService.serializeForm(x)));
        } else {
          res.status(403).json("User is not authorized for this class");
        }
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/parent/:id", async (req: Record<string, any>, res: Response) => {
  try {
    const parentForms = await formsService.findAllByParentId(+req.params.id);
    res.status(200).json(parentForms.map((x) => formsService.serializeForm(x)));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/student/:id", async (req: Request, res: Response) => {
  try {
    const studentForms = await formsService.findAllByStudentId(+req.params.id);
    res.status(200).json(studentForms.map((x) => formsService.serializeForm(x)));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req: Record<string, any>, res: Response) => {
  try {
    const form: FormDTO = req.body;
    const newForm = await formsService.insert(form);
    res.status(201).json(formsService.serializeForm(newForm));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req: Record<string, any>, res: Response) => {
  try {
    if (req.permission_level <= 100) {
      const updatedForm = await formsService.update(+req.params.id, req.body);
      res.status(203).json(updatedForm);
    } else {
      const form = await formsService.findById(+req.params.id);
      let formClass;
      let formSchool;
      if (form.class_id) {
        formClass = await classesService.findById(form.class_id);
      }
      if (form.school_id) {
        formSchool = await schoolsService.findById(form.school_id);
      }
      if (req.permission_level <= 200) {
        if (formSchool?.school_admin_id === +req.userId) {
          const updatedForm = await formsService.update(+req.params.id, req.body);
          res.status(203).json(formsService.serializeForm(updatedForm));
        } else {
          res.status(403).json({ message: `Form does not belong to user's school` });
        }
      } else if (req.permission_level <= 300) {
        if (formClass?.teacher_id === +req.userId) {
          const updatedForm = await formsService.update(+req.params.id, req.body);
          res.status(203).json(formsService.serializeForm(updatedForm));
        } else {
          res.status(403).json({ message: `Form does not belong to users class` });
        }
      } else {
        if (form.parent_id === +req.userId) {
          const updatedForm = await formsService.update(+req.params.id, req.body);
          res.status(203).json(formsService.serializeForm(updatedForm));
        } else {
          res.status(403).json({ message: `User is not the parent of the student's form` });
        }
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req: Record<string, any>, res: Response) => {
  try {
    if (req.permission_level <= 100) {
      res.status(203).json(await formsService.remove(+req.params.id));
    } else {
      const form = await formsService.findById(+req.params.id);
      if (form.school_id) {
        const school = await schoolsService.findById(form.school_id);
        if (school.school_admin_id === +req.userId) {
          res.status(203).json(await formsService.remove(+req.params.id));
        } else {
          res.status(403).json({ message: `User is not authorized to remove this form` });
        }
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
