import Knex from "knex";
import { knexConfig } from "../knexfile";

export default Knex(knexConfig[process.env.DB_URL || "development"]);
