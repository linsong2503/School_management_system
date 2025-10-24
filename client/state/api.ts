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
  sex: string;
  createdAt: Date;
  updatedAt?: Date;
  birthday: string;
  st: string;
  subjects: Subjects[];
  lessons: string;
  classes: Classes[];
}

export interface Subjects {
  id: number;
  name: string;
  teachers: Teacher[];
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

export interface Classes {
  id: number;
  name: string;
  capacity: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  // classId?:number
  // class   Class? @relation(fields: [classId], references: [id])
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  reducerPath: "api",
  tagTypes: [
    "Teachers",
    "Students",
    "Classes",
    "Subjects",
    "Parents",
    "Events",
  ],
  endpoints: (build) => ({
    getTeachers: build.query<Teacher[], void>({
      query: () => "teachers",
      providesTags: ["Teachers"],
    }),
    getTeacherById: build.query({
      query: (id) => `teachers/${id}`,
    }),
    createTeacher: build.mutation<Teacher, Partial<Teacher>>({
      query: (teachers) => ({
        url: "teachers",
        method: "POST",
        body: teachers,
      }),
      invalidatesTags: ["Teachers"],
    }),
    updateTeacher: build.mutation<
      Teacher,
      { teacherId: string } & Partial<Teacher>
    >({
      query: ({ teacherId, ...teacher }) => ({
        url: `teachers/${teacherId}`,
        method: "PUT",
        body: teacher,
      }),
      invalidatesTags: ["Teachers"],
    }),
    // getStudents: build.query<Student[], void>({
    //   query: () => "students",
    //   providesTags: ["Students"],
    // }),

    getClasses: build.query<Classes[], void>({
      query: () => "classes",
      providesTags: ["Classes"],
    }),
    getSubjects: build.query<Subjects[], void>({
      query: () => "subjects",
      providesTags: ["Subjects"],
    }),

    getParents: build.query<Parents[], void>({
      query: () => "parents",
      providesTags: ["Parents"],
    }),
    getParentById: build.query<
      {
        address: SetStateAction<string>;
        phone: SetStateAction<string>;
        email: SetStateAction<string>;
        surname: SetStateAction<string>;
        name: SetStateAction<string>;
        username: SetStateAction<string>;
        parent: Parents;
      },
      string
    >({
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
    updateParent: build.mutation<
      Parents,
      { parentId: string } & Partial<Parents>
    >({
      query: ({ parentId, ...parent }) => ({
        url: `parents/${parentId}`,
        method: "PUT",
        body: parent,
      }),
      invalidatesTags: ["Parents"],
    }),
    getEvents: build.query<Event[], void>({
      query: () => "events",
      providesTags: ["Events"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherByIdQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  // useGetStudentsQuery,
  useGetClassesQuery,
  useGetSubjectsQuery,
  useGetParentsQuery,
  useGetParentByIdQuery,
  useUpdateParentMutation,
  useCreateParentMutation,
  useGetEventsQuery,
} = api;
