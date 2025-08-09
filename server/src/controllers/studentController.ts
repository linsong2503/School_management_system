import { Response,Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStudents = async (
    req:Request,
    res:Response
) : Promise<void> =>{
    try {
        const students = await prisma.student.findMany(
            
        )
    } catch (e:any) {
        res.status(404).json(`Error when retrieving data:${e.message}`)
    }
}