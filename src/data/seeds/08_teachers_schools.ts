import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("teachers_schools").del();

  // Inserts seed entries
  await knex("teachers_schools").insert([{ teacher_id: 3, school_id: 1 }]);
}
