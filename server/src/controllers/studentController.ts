import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await prisma.student.findMany({
      where: {
        st: "A",
      },
      orderBy: {
        id: "asc",
      },
      include: {
        class: true,
        parent:{
          select:{
            phone:true
          }
        },
        grade: true,
        attendances: true,
        results: true,
      },
    });
    res.json(student);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving students: ${error.message}` });
  }
};

export const getStudentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const studentId = req.params.id;
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: parseInt(studentId),
      },
      include: {
        parent: true,
        class: true,
        grade: true,
        attendances: true,
        results: true,
      },
    });
    res.status(200).json(student);
  } catch (e: any) {
    res.status(404).json(`message: Error retrieving student: ${e.message}`);
  }
};
export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    username,
    name,
    surname,
    email,
    phone,
    parentPhone,
    address,
    img,
    bloodType,
    sex,
    birthday,
    createdAt,
    updatedAt,
    class_name,
    gradeId,
    st,
    p_username,
    p_name,
    p_surname,
    p_email,
    p_address,
  } = req.body;

  const InUsed_phone = await prisma.student.findFirst({
    where: {
      phone: phone,
    },
  });
  const InUsed_email = await prisma.student.findFirst({
    where: {
      email: email,
    },
  });
  if (InUsed_phone) {
    res
      .status(500)
      .json(`message: Error creating student: Phone number is in used `);
  }
  if (InUsed_email) {
    res.status(500).json(`message: Error creating student: Email is in used `);
  } else {
    try {
      const newStudent = await prisma.student.create({
        data: {
          username,
          name,
          surname,
          email,
          phone,
          address,
          img,
          bloodType,
          sex,
          birthday,
          createdAt,
          updatedAt,
          st,
          class_name:class_name,
          parent_phoneNum:parentPhone,
          parent: {
            connectOrCreate: {
              where: { phone: parentPhone },
              create: {
                username: p_username,
                name: p_name,
                surname: p_surname,
                email: p_email,
                phone: parentPhone,
                address: p_address,
                st,
                updatedAt,
                createdAt,
              },
            },
          },
          class: {
            connect: {
              name: class_name,
            },
          },
          grade: {
            connect: {
              id: gradeId,
            },
          },
        },
      });
      res.status(201).json(newStudent);
    } catch (error: any) {
      res.status(500).json(`message: Error creating student: ${error.message}`);
    }
  }
};
export const updateStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const StudentId = req.params.id
  try {
    const updatedStudent = await prisma.student.update({
      where:{
        id:parseInt(StudentId)
      },
      data:{
        
      }
    })
  } catch (error: any) {
    res
      .status(500)
      .json(`message: Error while updating Student: ${error.message}`);
  }
};
