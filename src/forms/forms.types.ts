export interface IForm {
  id: number;
  created_at: string;
  updated_at: string;
  master_form_id?: number;
  class_id?: number;
  school_id?: number;
  parent_id?: number;
  student_id?: number;
  name: string;
  description: string;
  base_form_url?: string;
  owner_signed_url?: string;
  parent_signed_url?: string;
  form_data: string;
}

export interface ISerializedForm {
  id: number;
  name: string;
  description: string;
  form_data: string;
  base_form_url?: string;
  owner_signed_url?: string;
  parent_signed_url?: string;
}
