import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const grade = await prisma.grade.findMany();
    res.status(200).json(grade);
  } catch (error: any) {
    res
      .status(404)
      .json(`message: Error while retrieving grades: ${error.message}`);
  }
};
