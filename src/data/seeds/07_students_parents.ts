import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("students_parents").del();

  // Inserts seed entries
  await knex("students_parents").insert([
    { parent_id: 4, student_id: 1 },
    { parent_id: 4, student_id: 2 },
    { parent_id: 4, student_id: 3 },
  ]);
}
