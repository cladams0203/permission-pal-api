import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("classes", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    tbl.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    tbl.integer("school_id").notNullable().unsigned().references("id").inTable("schools").onDelete("CASCADE").onUpdate("CASCADE");
    tbl.integer("teacher_id").notNullable().unsigned().references("id").inTable("users").onUpdate("CASCADE");
    tbl.string("grade").notNullable();
    tbl.string("class_identity");
  }).raw(`
  CREATE TRIGGER update_class_updated_at BEFORE UPDATE
  ON classes FOR EACH ROW EXECUTE PROCEDURE 
  update_updated_at_column();
`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("classes");
}
