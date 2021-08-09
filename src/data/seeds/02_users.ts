import * as Knex from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { role_id: 1, username: "Chris", email: "cadams@tonnertech.com", password: bcrypt.hashSync("taco") },
    { role_id: 2, username: "test_principal", email: "test_principal@school.com", password: bcrypt.hashSync("principal") },
    { role_id: 3, username: "test_teacher", email: "test_teacher@school.com", password: bcrypt.hashSync("teacher") },
    { role_id: 4, username: "test_parent", email: "test_parent@parent.com", password: bcrypt.hashSync("parent") },
  ]);
}
