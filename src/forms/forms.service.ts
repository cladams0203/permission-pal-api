import { QueryBuilder } from "knex";
import db from "../data/dbConfig";
import { IForm, ISerializedForm } from "./forms.types";

const find = async (): Promise<IForm[]> => {
  const allForms = await db("forms");
  return allForms;
};

const findById = async (id: number): Promise<IForm> => {
  const form = await db("forms").where({ id }).first();
  return form;
};

const findAllByMasterId = async (master_id: number): Promise<IForm[]> => {
  const masterForms = await db("forms").where({ master_id });
  return masterForms;
};

const findAllBySchoolId = async (school_id: number): Promise<IForm[]> => {
  const schoolForms = await db("forms").where({ school_id });
  return schoolForms;
};

const findAllByClassId = async (class_id: number): Promise<IForm[]> => {
  const classForms = await db("forms").where({ class_id });
  return classForms;
};

const findAllByParentId = async (parent_id: number): Promise<IForm[]> => {
  const parentForms = await db("forms").where({ parent_id });
  return parentForms;
};

const findAllByStudentId = async (student_id: number): Promise<IForm[]> => {
  const studentForms = await db("forms").where({ student_id });
  return studentForms;
};

const update = async (id: number, form: IForm): Promise<IForm> => {
  form.form_data = JSON.stringify(form.form_data);
  const [updatedForm] = await db("forms").where({ id }).update(form, "*");
  return { ...updatedForm, form_data: JSON.parse(updatedForm.form_data) };
};

const remove = async (id: number): Promise<number> => {
  return await db("forms").where({ id }).del();
};

const serializeForm = (form: IForm): ISerializedForm => {
  const formData = JSON.parse(form.form_data);
  const { id, name, description, base_form_url, owner_signed_url, parent_signed_url } = form;
  return { id, name, description, base_form_url, owner_signed_url, parent_signed_url, form_data: formData };
};

export default {
  find,
  findById,
  findAllByMasterId,
  findAllBySchoolId,
  findAllByClassId,
  findAllByParentId,
  findAllByStudentId,
  update,
  remove,
  serializeForm,
};
