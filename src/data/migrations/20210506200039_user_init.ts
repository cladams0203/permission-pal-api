import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (tbl: Knex.TableBuilder) => {
    tbl.increments();
    tbl.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    tbl.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    tbl.integer("role_id").unsigned().references("id").inTable("roles");
    tbl.string("username").notNullable().unique();
    tbl.string("first_name");
    tbl.string("last_name");
    tbl.string("email").notNullable().unique();
    tbl.string("address");
    tbl.string("password");
    tbl.string("apple_id").unique();
    tbl.string("facebook_id").unique();
    tbl.string("google_id").unique();
  }).raw(`
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
   NEW."updated_at"=now(); 
   RETURN NEW;
  END;
  $$ language 'plpgsql';
`).raw(`
  CREATE TRIGGER update_user_updated_at BEFORE UPDATE
  ON users FOR EACH ROW EXECUTE PROCEDURE 
  update_updated_at_column();
`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
