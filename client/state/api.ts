import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SetStateAction } from "react";
export interface Teacher {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  img?: string;
  address: string;
  bloodType: string;
  sex: string;
  createdAt: Date;
  updatedAt?: Date;
  birthday: string;
  st: string;
  subjects: Subject[];
  lessons: string;
  classes: Class[];
}

export interface Student {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  img?: string;
  bloodType: string;
  sex: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId: number;
  parent: Parent;
  classId: number;
  className: Class;
  gradeId: number;
  grade: Grade;
  attendances: Attendance;
}

export interface Subject {
  id: number;
  name: string;
  teachers?: Teacher[];
}

export interface Parent {
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

export interface Class {
  id: number;
  name: string;
  capacity: number;
}

export interface Lesson {
  id: number;
  name: string;
  day: Date;
  startTime: Date;
  endTime: Date;
  subjectId: number;
  subject: Subject;
  classId: number;
  class: Class;
  teacherId: number;
  teacher: Teacher;
  exams: Exam[];
  assignments: Assignment[];
  attendances: Attendance[];
}

export interface Exam {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;

  lessonID: number;
  lesson: Lesson;
  results: Result;
}

export interface Assignment {
  id: number;
  title: string;
  startTime: Date;
  dueTime: Date;

  lessonId: number;
  lesson: Lesson;
  results: Result[];
}

export interface Result {
  id: number;
  score: number;
  examId?: number;
  exam?: Exam;
  assignmentId?: number;
  assignment?: Assignment;
  studentId: number;
  student: Student;
}

export interface Grade {
  id: number;
  level: number;
  student: Student[];
  classes: Class[];
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  classId?: number;
  class?: Class;
}
export interface Attendance {
  id: number;
  date: Date;
  present: boolean;
  studentId: number;
  student: Student;
  lessonsId: number;
  lesson: Lesson;
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
    //  Teacher API
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

    // Student API
    getStudents: build.query<Student[], void>({
      query: () => "students",
      providesTags: ["Students"],
    }),

    getStudentById: build.query({
      query: (id) => `/students/${id}`,
    }),

    createStudent: build.mutation<Student, Partial<Student>>({
      query: (students) => ({
        url: "students",
        method: "POST",
        body: students,
      }),
      invalidatesTags: ["Students"],
    }),

    updateStudent: build.mutation<
      Student,
      { studentId: string } & Partial<Student>
    >({
      query: (studentId, ...student) => ({
        url: `/students/${studentId}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),

    // Class API

    getClasses: build.query<Class[], void>({
      query: () => "classes",
      providesTags: ["Classes"],
    }),

    //  Subject API

    getSubjects: build.query<Subject[], void>({
      query: () => "subjects",
      providesTags: ["Subjects"],
    }),

    // Parent API

    getParents: build.query<Parent[], void>({
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
        parent: Parent;
      },
      string
    >({
      query: (id) => `parents/${id}`,
    }),

    createParent: build.mutation<Parent, Partial<Parent>>({
      query: (parents) => ({
        url: "parents",
        method: "POST",
        body: parents,
      }),
      invalidatesTags: ["Parents"],
    }),

    updateParent: build.mutation<
      Parent,
      { parentId: string } & Partial<Parent>
    >({
      query: ({ parentId, ...parent }) => ({
        url: `parents/${parentId}`,
        method: "PUT",
        body: parent,
      }),
      invalidatesTags: ["Parents"],
    }),

    //  Event API

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
  useGetStudentsQuery,
  useGetClassesQuery,
  useGetSubjectsQuery,
  useGetParentsQuery,
  useGetParentByIdQuery,
  useUpdateParentMutation,
  useCreateParentMutation,
  useGetEventsQuery,
} = api;
