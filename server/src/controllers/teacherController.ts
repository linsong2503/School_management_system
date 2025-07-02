import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { Subject, Class } from "@prisma/client";
const prisma = new PrismaClient();
type subjects = Subject[];
type classes = Class[];
export const getTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        subjects: true,
        classes: true,
      },
    });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving teachers" });
  }
};
