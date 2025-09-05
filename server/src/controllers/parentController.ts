import { Response, Request} from "express";
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

export const createParents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newParent = await prisma.parent.create({
      data: req.body,
    });
    res.status(201).json(newParent);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating parent: ${error.message}` });
  }
};

export const updateParents = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ParentId = parseInt(req.params.id);
  const { username, name, surname, email, phone, address, updatedAt } =
    req.body;
  try {
    const updatedParent = await prisma.parent.update({
      where: {
        id: ParentId,
      },
      data: {
        username,
        name,
        surname,
        email,
        phone,
        address,
        updatedAt,
      },
    });
    res.status(204).json(updatedParent);
  } catch (e: any) {
    res.status(500).json({ message: `Error updating parent: ${e.message}` });
  }
};
