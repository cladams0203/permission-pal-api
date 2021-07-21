import { QueryBuilder } from "knex";
import db from "../data/dbConfig";

const findByRole = async (role: string) => {
  return await db("roles").where({ role }).first();
};

const findById = async (id: number) => {
  return await db("roles").where({ id }).first();
};

export default {
  findByRole,
  findById,
};
