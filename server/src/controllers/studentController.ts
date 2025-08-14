import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await prisma.student.findMany({
      include: {
        class: true,
        grade:true,
        attendances: true,
        results:true
      },
    });
    res.json(student);
  } catch (error:any) {
    res.status(500).json({ message: `Error retrieving teachers: ${error.message}` });
  }
};

