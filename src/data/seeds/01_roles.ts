import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("roles").del();

  // Inserts seed entries
  await knex("roles").insert([
    { role: "super_admin", permission_level: 100 },
    { role: "school_admin", permission_level: 200 },
    { role: "teacher", permission_level: 300 },
    { role: "parent", permission_level: 400 },
    { role: "student", permission_level: 500 },
  ]);
}
