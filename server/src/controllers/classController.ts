import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const classes = await prisma.class.findMany({});
    res.status(200).json(classes);
  } catch (error: any) {
    res
      .status(404)
      .json({ message: `Error retrieving classes: ${error.message}` });
  }
};
