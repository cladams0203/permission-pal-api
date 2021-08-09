import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("students").del();

  // Inserts seed entries
  await knex("students").insert([
    { school_id: 1, name: "John Smith", date_of_birth: "4-7-2011" },
    { school_id: 1, name: "Jane Smith" },
    { school_id: 1, name: "Stan Lee" },
  ]);
}
