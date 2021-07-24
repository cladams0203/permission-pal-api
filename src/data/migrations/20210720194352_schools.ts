import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("schools", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    tbl.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    tbl.integer("school_admin_id").notNullable().unsigned().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    tbl.string("name").notNullable();
    tbl.string("address").notNullable();
    tbl.string("city").notNullable();
    tbl.string("state").notNullable();
    tbl.string("zip").notNullable();
    tbl.string("location_lat");
    tbl.string("location_lon");
  }).raw(`
  CREATE TRIGGER update_school_updated_at BEFORE UPDATE
  ON schools FOR EACH ROW EXECUTE PROCEDURE 
  update_updated_at_column();
`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("schools");
}
