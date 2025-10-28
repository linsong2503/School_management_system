import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await prisma.student.findMany({
      where: {
        st: "A",
      },
      orderBy: {
        id: "asc",
      },
      include: {
        class: true,
        grade: true,
        attendances: true,
        results: true,
      },
    });
    res.json(student);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving teachers: ${error.message}` });
  }
};

export const getStudentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const studentId = req.params.id;
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        parent: true,
        class: true,
        grade: true,
        attendances: true,
        results: true,
      },
    });
    res.status(200).json(student);
  } catch (e: any) {
    res.status(404).json(`message: Error retrieving student: ${e.message}`);
  }
};
export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newStudent = await prisma.student.create({
      data: req.body,
    });
    res.status(201).json(newStudent);
  } catch (error: any) {
    res.status(500).json(`message: Error creating student: ${error.message}`);
  }
};
