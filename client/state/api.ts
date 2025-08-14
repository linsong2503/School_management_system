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
  address: string;
  bloodType: string;
  sex: UserSex;
  createdAt: string;
  birthday: string;
  subjects: Subject[];
  lessons: Lesson[];
  classes: Class[];
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
