export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  courses: Course[];
}
