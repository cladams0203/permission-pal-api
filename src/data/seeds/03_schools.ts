import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("schools").del();

  // Inserts seed entries
  await knex("schools").insert([{ school_admin_id: 2, name: "test achool", address: "123 the way", city: "knowhere", state: "alaska", zip: "12345" }]);
}
