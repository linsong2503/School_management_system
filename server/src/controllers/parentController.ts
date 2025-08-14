import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getParents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parents = await prisma.parent.findMany({
      include: {
        students: true,
      },
    });
    res.json(parents);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error while retrieving parents: ${error.message}` });
  }
};
