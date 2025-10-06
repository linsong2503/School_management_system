import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (e: any) {
    res.status(404).json({ message: `Error retrieving events: ${e.message}` });
  }
};
