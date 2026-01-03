import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teachers = await prisma.teacher.findMany({
      where: {
        st: "A",
      },
      orderBy: {
        id: "asc",
      },
      include: {
        subjects: true,
        lessons: true,
        classes: true,
      },
    });
    res.json(teachers);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving teachers: ${error.message}` });
  }
};
export const getTeacherById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ID = parseInt(req.params.id);
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: ID,
      },
      include:{
        _count:{
          select:{
            subjects:true,
            lessons:true,
            classes:true
          }
        }
      }
    });
    res.status(200).json(teacher);
  } catch (e: any) {
    res.status(404).json({ message: `Error retrieving teacher: ${e.message}` });
  }
};
export const createTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    username,
    name,
    surname,
    email,
    phone,
    address,
    img,
    bloodType,
    sex,
    subjects = [],
    createdAt,
    updatedAt,
    birthday,
    st,
  } = req.body;
  try {
    const newTeacher = await prisma.teacher.create({
      data: {
        username,
        name,
        surname,
        email,
        phone,
        address,
        img,
        bloodType,
        sex,
        createdAt,
        updatedAt,
        st,
        birthday,
        subjects: {
          connect: subjects.map((name: any) => ({ name })),
        },
      },
    });
    res.status(201).json(newTeacher);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating teacher: ${error.message}` });
  }
};

export const updateTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ID = parseInt(req.params.id);
  const {
    username,
    name,
    surname,
    email,
    phone,
    address,
    updatedAt,
    subjects = [],
    st,
  } = req.body;
  try {
    const updatedTeacher = await prisma.teacher.update({
      where: {
        id: ID,
      },
      data: {
        username,
        name,
        surname,
        email,
        phone,
        address,
        subjects: {
          connect: subjects.map((name: any) => ({ name })),
        },
        updatedAt,
        st,
      },
    });
    res.json(updatedTeacher);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating teacher: ${error.message}` });
  }
};
