import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("schools", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.integer("school_admin_id").unsigned().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    tbl.string("name").notNullable();
    tbl.string("address");
    tbl.string("location_lat");
    tbl.string("location_lon");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("schools");
}
