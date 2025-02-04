export interface Course {
  id: string;
  name: string;
  duration: number;
  quota: number;
  category: Category;
  modality: Modality;
}

export interface Category {
  id: string;
  name: string;
}

export interface Modality {
  id: string;
  name: string;
}

export interface InscriptionStatus {
  id: string;
  name: string;
}

export interface UserCourse {
  user_id: string;
  course: string;
  insciption_status_id: InscriptionStatus;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  verified_email_at?: string;
  role_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  courses: UserCourse[];
  role: Role;
}
