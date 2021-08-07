import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("classes").del();

  // Inserts seed entries
  await knex("classes").insert([
    { school_id: 1, teacher_id: 3, grade: "5th", class_identity: "A6" },
    { school_id: 1, teacher_id: 3, grade: "5th", class_identity: "A7" },
  ]);
}
