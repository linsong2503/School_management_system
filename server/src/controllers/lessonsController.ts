import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLessons = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).json(lessons);
  } catch (error: any) {
    res
      .status(404)
      .json(`message: Failed while retrieving data: ${error.message}`);
  }
};

export const getLessonsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        teacherId: parseInt(id),
      },
      orderBy: {
        id: "asc",
      },
    });
  } catch (error: any) {
    res
      .status(404)
      .json(`message: Failed while retrieving data: ${error.message}`);
  }
};
