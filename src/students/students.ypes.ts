export interface IStudent {
  id: number;
  school_id: number;
  name: string;
  school_student_id?: number;
  school_user_id?: number;
}

export interface StudentDTO {
  school_id: number;
  name: string;
  date_of_birth?: string;
  school_student_id?: string;
}

export interface StudentToClass {
  student_id: number;
  class_id: number;
}
