declare module "*.svg" {
  const content: string;
  export default content;
}

export interface CoursesType {
  id: number;
  title: string;
  description: string;
  price: string;
}

export interface CourseType {
  id: number;
  title: string;
  description: string;
  price: string;
  imageLink: string;
}
