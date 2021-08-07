export interface IClass {
  id: number;
  created_at: string;
  updated_at: string;
  school_id: number;
  teacher_id: number;
  grade: string;
  class_identity?: string;
}

export interface ISerializedClass {
  id: number;
  grade: string;
  class_identity?: string;
}

export interface ClassDTO {
  school_id: number;
  teacher_id: number;
  grade: string;
  class_identity?: string;
}
