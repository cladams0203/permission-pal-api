import Knex from "knex";
import knexTinyLogger from "knex-tiny-logger";
import knexConfig from "../knexfile";

const checkDebug = () => {
  if (process.env.DEBUG) {
    return knexTinyLogger(Knex(knexConfig[process.env.DB_ENV || "development"]));
  } else {
    return Knex(knexConfig[process.env.DB_ENV || "development"]);
  }
};
export default checkDebug();

// export default Knex(knexConfig[process.env.DB_URL || "development"])
