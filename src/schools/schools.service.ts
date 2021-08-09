import { QueryBuilder } from "knex";
import db from "../data/dbConfig";
import { ISchool, ISerializedSchool, SchoolDTO } from "./schools.types";

const find = async (): Promise<ISchool[]> => {
  const schools = await db("schools");
  return schools;
};

const findById = async (id: number): Promise<ISchool> => {
  const school = await db("schools").where({ id }).first();
  return school;
};

const findBySchoolAdminId = async (school_admin_id: number): Promise<ISchool> => {
  const school = await db("schools").where({ school_admin_id }).first();
  return school;
};

const findByName = async (name: string): Promise<ISchool[]> => {
  const foundSchools = await db("schools").where("name", "like", `%${name}%`);
  return foundSchools;
};

const update = async (id: number, school: ISchool): Promise<ISchool> => {
  const [updatedSchool] = await db("schools").where({ id }).update(school, "*");
  return updatedSchool;
};

const remove = (id: number): QueryBuilder<number> => {
  return db("schools").where({ id }).del();
};

const insert = async (school: SchoolDTO): Promise<ISchool> => {
  const [newSchool] = await db("schools").insert(school, "*");
  return newSchool;
};

const serializeSchool = (school: ISchool): ISerializedSchool => {
  const { id, name, address, city, state, zip, location_lat, location_lon } = school;
  return { id, name, address, city, state, zip, location_lat, location_lon };
};

export default {
  find,
  findById,
  findByName,
  insert,
  update,
  remove,
  findBySchoolAdminId,
  serializeSchool,
};
