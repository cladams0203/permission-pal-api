export interface ISchool {
  id: number;
  created_at: string;
  updated_at: string;
  school_admin_id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  location_lat?: string;
  location_lon?: string;
}

export interface ISerializedSchool {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  location_lat?: string;
  location_lon?: string;
}

export interface SchoolDTO {
  name: string;
  school_admin_id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  location_lat?: string;
  location_lon?: string;
}
