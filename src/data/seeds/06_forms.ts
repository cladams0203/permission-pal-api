import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("forms").del();

  // Inserts seed entries
  await knex("forms").insert([
    {
      school_id: 1,
      class_id: null,
      name: "Test Master Form",
      description: "Master form created by school to make subsequent individual forms",
      form_data: JSON.stringify({ heading: "this will be json data" }),
    },
    {
      school_id: 1,
      master_form_id: 1,
      name: "Test Form 1",
      class_id: 1,
      parent_id: 4,
      student_id: 1,
      description: "Form created from master",
      form_data: JSON.stringify({ heading: "this will be json data" }),
    },
    {
      school_id: 1,
      master_form_id: 1,
      name: "Test Form 2",
      class_id: 2,
      parent_id: 4,
      student_id: 2,
      description: "Form created from master",
      form_data: JSON.stringify({ heading: "this will be json data" }),
    },
    {
      school_id: 1,
      master_form_id: 1,
      name: "Test Form 3",
      class_id: 1,
      parent_id: 4,
      student_id: 3,
      description: "Form created from master",
      form_data: JSON.stringify({ heading: "this will be json data" }),
    },
  ]);
}
