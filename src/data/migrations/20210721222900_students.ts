import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("students", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.integer("school_id").references("id").inTable("schools").unsigned().notNullable().onDelete("CASCADE").onUpdate("CASCADE");
    tbl.integer("student_user_id").references("id").inTable("users").unsigned().onUpdate("CASCADE");
    tbl.string("name").notNullable();
    tbl.string("date_of_birth");
    tbl.string("student_school_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("students");
}
