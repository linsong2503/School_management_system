import {
  Subject,
  UserSex,
  Class,
  Lesson,
  Student,
  Parent,
} from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Teacher {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  img:string;
  address: string;
  bloodType: string;
  sex: User_Sex;
  createdAt: string;
  birthday: string;
  subjects: string;
  lessons: string;
  classes: string;
}
export interface Parents {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  students: Student[];
}
export enum Subjects {
  na = "N/A",
  maths = "Mathemactics",
  physics = "Physics",
  chemistry = "Chemistry",
  biology = "Biology",
  history = "History",
  literature = "Literature"
}
export enum User_Sex {
  MALE,
  FEMALE
}
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  reducerPath: "api",
  tagTypes: ["Teachers", "Students", "Parents"],
  endpoints: (build) => ({
    getTeachers: build.query<Teacher[], void>({
      query: () => "teachers",
      providesTags: ["Teachers"],
    }),
    createTeacher: build.mutation<Teacher, Partial<Teacher>>({
      query: (teachers) => ({
        url: "teachers",
        method: "POST",
        body: teachers,
      }),
      invalidatesTags: ["Teachers"],
    }),
    getStudents: build.query<Student[], void>({
      query: () => "students",
      providesTags: ["Students"],
    }),
    getParents: build.query<Parent[], void>({
      query: () => "parents",
      providesTags: ["Parents"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useGetStudentsQuery,
  useGetParentsQuery,
} = api;
