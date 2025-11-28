"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudents = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield prisma.student.findMany({
            where: {
                st: "A",
            },
            orderBy: {
                id: "asc",
            },
            include: {
                class: true,
                parent: {
                    select: {
                        phone: true
                    }
                },
                grade: true,
                attendances: true,
                results: true,
            },
        });
        res.json(student);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving students: ${error.message}` });
    }
});
exports.getStudents = getStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id;
    try {
        const student = yield prisma.student.findUnique({
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
    }
    catch (e) {
        res.status(404).json(`message: Error retrieving student: ${e.message}`);
    }
});
exports.getStudentById = getStudentById;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, surname, email, phone, parentPhone, address, img, bloodType, sex, birthday, createdAt, updatedAt, class_name, gradeId, st, p_username, p_name, p_surname, p_email, p_address, } = req.body;
    const InUsed_phone = yield prisma.student.findFirst({
        where: {
            phone: phone,
        },
    });
    const InUsed_email = yield prisma.student.findFirst({
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
    }
    else {
        try {
            const newStudent = yield prisma.student.create({
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
                    class_name: class_name,
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
        }
        catch (error) {
            res.status(500).json(`message: Error creating student: ${error.message}`);
        }
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const StudentId = req.params.id;
    try {
        const updatedStudent = yield prisma.student.update({
            where: {
                id: parseInt(StudentId)
            },
            data: {}
        });
    }
    catch (error) {
        res
            .status(500)
            .json(`message: Error while updating Student: ${error.message}`);
    }
});
exports.updateStudent = updateStudent;
