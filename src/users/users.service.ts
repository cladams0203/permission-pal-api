import { QueryBuilder } from "knex";
import db from "../data/dbConfig";
import { IFindBy, IUser, IUserUpdate } from "./users.types";

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

export default {
  find,
  findById,
  findBy,
  insert,
  update,
  remove,
};
