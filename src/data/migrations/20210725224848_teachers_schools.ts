import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("teachers_schools", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.integer("teacher_id").notNullable().unsigned().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    tbl.integer("school_id").notNullable().unsigned().references("id").inTable("schools").onDelete("CASCADE").onUpdate("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropSchemaIfExists("teachers_schools");
}
