import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("forms", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
    tbl.timestamp("updated_at").defaultTo(knex.fn.now());
    tbl.integer("master_form_id").unsigned().references("id").inTable("forms").onUpdate("CASCADE");
    tbl.integer("school_id").unsigned().notNullable().references("id").inTable("schools").onUpdate("CASCADE");
    tbl.integer("class_id").nullable().unsigned().references("id").inTable("classes").onUpdate("CASCADE");
    tbl.integer("parent_id").nullable().unsigned().references("id").inTable("users");
    tbl.integer("student_id").nullable().unsigned().references("id").inTable("students");
    tbl.string("name").notNullable();
    tbl.text("description").notNullable();
    tbl.string("base_form_url");
    tbl.string("owner_signed_url");
    tbl.string("parent_signed_url");
    tbl.json("form_data").notNullable();
  }).raw(`
  CREATE TRIGGER update_form_updated_at BEFORE UPDATE
  ON forms FOR EACH ROW EXECUTE PROCEDURE 
  update_updated_at_column();
`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("forms");
}
