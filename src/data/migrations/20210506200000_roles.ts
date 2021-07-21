import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("roles", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.string("role").notNullable().unique();
    tbl.integer("permission_level").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("roles");
}
