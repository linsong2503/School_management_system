import { Response,Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSubjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subjects =await prisma.subject.findMany();
    res.status(200).json(subjects);
  } catch (error: any) {
     res.status(404).json({ message: `Error retrieving events: ${error.message}` });
  }
};
