import { QueryBuilder } from "knex";
import db from "../data/dbConfig";
import { IStudent, StudentDTO, StudentToClass } from "./students.ypes";

const find = async (): Promise<IStudent[]> => {
  return await db("students");
};

const findById = async (id: number): Promise<IStudent> => {
  return await db("students").where({ id }).first();
};

const insert = async (student: StudentDTO): Promise<IStudent> => {
  const [newStudent] = await db("students").insert(student, "*");
  return newStudent;
};
const update = async (student: StudentDTO): Promise<IStudent> => {
  const [updatedStudent] = await db("students").update(student, "*");
  return updatedStudent;
};
const remove = (id: number): QueryBuilder<number> => {
  return db("students").where({ id }).del();
};

const findAllByClassId = async (class_id: number): Promise<IStudent[]> => {
  const students = await db("students").whereIn("id", async () => await db("student_classes").select("class_id").where({ class_id }));
  return students;
};

const findAllByParentId = async (parent_id: number): Promise<IStudent[]> => {
  const students = await db("students").whereIn("id", async () => await db("student_parents").select("parent_id").where({ parent_id }));
  return students;
};

const addStudentsToClass = async (students: StudentToClass[], class_id: number): Promise<IStudent[]> => {
  await db("students_classes").insert(students);
  return await findAllByClassId(class_id);
};

export default {
  find,
  findById,
  insert,
  update,
  remove,
  findAllByClassId,
  findAllByParentId,
  addStudentsToClass,
};
