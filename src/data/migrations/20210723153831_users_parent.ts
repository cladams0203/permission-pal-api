import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("students_parents", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.integer("parent_id").unsigned().references("id").inTable("users").notNullable();
    tbl.integer("student_id").unsigned().references("id").inTable("users").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("students_parents");
}
