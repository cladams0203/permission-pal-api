import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.integer("role_id").notNullable().unsigned().references("id").inTable("roles");
    tbl.string("username").notNullable().unique();
    tbl.string("first_name");
    tbl.string("last_name");
    tbl.string("email").notNullable().unique();
    tbl.string("address");
    tbl.string("password");
    tbl.string("apple_id").unique();
    tbl.string("facebook_id").unique();
    tbl.string("google_id").unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
