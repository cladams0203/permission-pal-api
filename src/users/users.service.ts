import { QueryBuilder } from "knex";
import db from "../data/dbConfig";
import rolesService from "../roles/roles.service";
import studentsService from "../students/students.service";
import { IStudent } from "../students/students.ypes";
import { IFindBy, ISeriealizedUser, IUser, IUserUpdate } from "./users.types";

const find = async (): Promise<IUser[]> => {
  const users = await db("users");
  return users;
};

const findById = async (id: number): Promise<IUser> => {
  const user = await db("users").where({ id }).first();
  return user;
};

const findBy = async (queryObj: IFindBy): Promise<IUser> => {
  const user = await db("users").where(queryObj).first();
  return user;
};

const insert = async (user: IUser): Promise<IUser> => {
  const [newUser] = await db("users").insert(user, "*");
  return newUser;
};

const update = async (id: number, user: IUserUpdate): Promise<IUser> => {
  const [updated] = await db("users").where({ id }).update(user, "*");
  return updated;
};

const remove = (id: number): QueryBuilder<number> => {
  return db("users").where({ id }).del();
};

const addStudentToParent = async (student_id: number, parent_id: number): Promise<IStudent> => {
  await db("students_parents").insert({ student_id, parent_id });
  return await studentsService.findById(student_id);
};

const serializeUser = async (user: IUser): Promise<ISeriealizedUser> => {
  const { id, username, first_name, last_name, address, email, role_id } = user;
  const { role } = await rolesService.findById(role_id);
  return { id, username, first_name, last_name, address, email, role };
};

export default {
  find,
  findById,
  findBy,
  insert,
  update,
  remove,
  serializeUser,
  addStudentToParent,
};
