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
    createdAt,
    updatedAt,
    subjectNames,
    classes,
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
        subjects :{
          create:[
            {name:subjectNames}
          ]
        }
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
    img,
    bloodType,
    sex,
    updatedAt,
    birthday,
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
        img,
        bloodType,
        sex,
        updatedAt,
        birthday,
        st,
      },
    });
    res.json(updateTeacher);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating teacher: ${error.message}` });
  }
};
