import db from "../data/dbConfig";
import { ISchool } from "../schools/schools.types";
import { IUser } from "../users/users.types";

const findAllSchoolsByTeacherId = async (teacher_id: number): Promise<ISchool[]> => {
  const teacherSchools = await db("schools").whereIn("id", async () => await db("teachers_classes").select("school_id").where({ teacher_id }));
  return teacherSchools;
};

const findAllTeachersBySchoolId = async (school_id: number): Promise<IUser[]> => {
  const teachers = await db("users").whereIn("id", async () => await db("teachers_classes").select("teacher_id").where({ school_id }));
  return teachers;
};

export default {
  findAllSchoolsByTeacherId,
  findAllTeachersBySchoolId,
};
