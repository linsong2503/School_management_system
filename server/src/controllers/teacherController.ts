import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        subjects: true,
        lessons:true,
        classes: true,
      },
    });
    res.json(teachers);
  } catch (error:any) {
    res.status(500).json({ message: `Error retrieving teachers: ${error.message}` });
  }
};

export const createTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    id,
    username,
    name,
    surname,
    email,
    phone,
    address,
    img,
    bloodType,
    sex,
    subjects,
    birthday,
  } = req.body;
  try {
    const newTeacher = await prisma.teacher.create({
      data: {
        id,
        username,
        name,
        surname,
        email,
        phone,
        address,
        img,
        bloodType,
        sex,
        subjects,
        birthday,
      },
    });
    res.status(201).json(newTeacher);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating teacher: ${error.message}` });
  }
};
