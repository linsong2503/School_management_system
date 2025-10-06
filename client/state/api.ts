import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SetStateAction } from "react";
export interface Teacher {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  img: string;
  address: string;
  bloodType: string;
  sex: User_Sex;
  createdAt: Date;
  updatedAt?: Date;
  birthday: string;
  st: string;
  subjects: string;
  lessons: string;
  classes: string;
}
export interface Parents {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  st: string;
  // students: Student[];
}
export enum Subjects {
  na = "N/A",
  maths = "Mathemactics",
  physics = "Physics",
  chemistry = "Chemistry",
  biology = "Biology",
  history = "History",
  literature = "Literature",
}
export enum Classes {
  a_1 = "1A",
  b_1 = "1B",
  c_1 = "1C",
  a_2 = "2A",
  b_2 = "2B",
  c_2 = "2C",
  a_3 = "3A",
  b_3 = "3B",
  c_3 = "3C",
  a_4 = "4A",
  b_4 = "4B",
  c_4 = "4C",
  a_5 = "5A",
  b_5 = "5B",
  c_5 = "5C",
}

export enum Events {
  bg = "Blue and Gold Day",
  pe = "Pie-a-Teacher Event",
  pd = "Prize Drawings",
  sw = "Spirit weeks",
}

export enum User_Sex {
  MALE,
  FEMALE,
}
export enum Blood_Types {
  a_p = "A+",
  b_p = "B+",
  ab_p = "AB+",
  o_p = "O+",
  a_m = "A-",
  b_m = "B-",
  ab_m = "AB-",
  o_m = "O-",
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
    // getStudents: build.query<Student[], void>({
    //   query: () => "students",
    //   providesTags: ["Students"],
    // }),
    getParents: build.query<Parents[], void>({
      query: () => "parents",
      providesTags: ["Parents"],
    }),
    getParentById: build.query<{
      address: SetStateAction<string>;
      phone: SetStateAction<string>;
      email: SetStateAction<string>;
      surname: SetStateAction<string>;
      name: SetStateAction<string>;
      username: SetStateAction<string>; parent: Parents 
}, string>({
      query: (id) => `parents/${id}`,
    }),
    createParent: build.mutation<Parents, Partial<Parents>>({
      query: (parents) => ({
        url: "parents",
        method: "POST",
        body: parents,
      }),
      invalidatesTags: ["Parents"],
    }),
    updateParent: build.mutation<Parents, { parentId: string } & Partial<Parents>>({
      query: ({parentId,...parent}) => ({
        url: `parents/${parentId}`,
        method: "PUT",
        body: parent,
      }),
      invalidatesTags: ["Parents"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  // useGetStudentsQuery,
  useGetParentsQuery,
  useGetParentByIdQuery,
  useUpdateParentMutation,
  useCreateParentMutation,
} = api;
