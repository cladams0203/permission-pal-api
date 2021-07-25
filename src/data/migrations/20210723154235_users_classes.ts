import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("students_classes", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.integer("student_id").unsigned().references("id").inTable("users").onUpdate("CASCADE");
    tbl.integer("class_id").unsigned().references("id").inTable("classes").onUpdate("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("students_classes");
}