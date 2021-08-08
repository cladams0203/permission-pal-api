import { QueryBuilder } from "knex";
import db from "../data/dbConfig";
import { ClassDTO, IClass, ISerializedClass } from "./classes.types";

const find = async (): Promise<IClass[]> => {
  const classes = await db("classes");
  return classes;
};

const findById = async (id: number): Promise<IClass> => {
  const foundClass = await db("classes").where({ id }).first();
  return foundClass;
};

const findAllBySchoolId = async (school_id: number): Promise<IClass[]> => {
  const schoolClasses = await db("classes").where({ school_id });
  return schoolClasses;
};

const findAllTeacherId = async (teacher_id: number): Promise<IClass[]> => {
  const teacherClasses = await db("classes").where({ teacher_id });
  return teacherClasses;
};

const findAllByStudentId = async (student_id: number): Promise<IClass[]> => {
  const studentClasses = await db("classes").whereIn(
    "id",
    (await db("students_classes").select("class_id").where({ student_id })).map((x) => x.class_id)
  );
  return studentClasses;
};

const update = async (id: number, updateclass: IClass): Promise<IClass> => {
  const [updatedClass] = await db("classes").where({ id }).update(updateclass, "*");
  return updatedClass;
};

const remove = (id: number): QueryBuilder<number> => {
  return db("classes").where({ id }).del();
};

const insert = async (newClass: ClassDTO): Promise<IClass> => {
  const [addedClass] = await db("classes").insert(newClass, "*");
  await db("teachers_schools").insert({ teacher_id: addedClass.teacher_id, school_id: addedClass.school_id });
  return addedClass;
};

const serializeClass = (rawClass: IClass): ISerializedClass => {
  const { id, grade, class_identity, created_at, updated_at } = rawClass;
  return { id, grade, class_identity, created_at, updated_at };
};

export default {
  find,
  findById,
  findAllBySchoolId,
  findAllTeacherId,
  findAllByStudentId,
  insert,
  update,
  remove,
  serializeClass,
};
