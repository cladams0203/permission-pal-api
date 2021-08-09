import { QueryBuilder } from "knex";
import db from "../data/dbConfig";
import { IRole } from "./roles.types";

const findByRole = async (role: string): Promise<IRole> => {
  return await db("roles").where({ role }).first();
};

const findById = async (id: number): Promise<IRole> => {
  return await db("roles").where({ id }).first();
};

export default {
  findByRole,
  findById,
};
