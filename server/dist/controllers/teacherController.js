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
exports.createTeacher = exports.getTeachers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield prisma.teacher.findMany({
            include: {
                subjects: true,
                lessons: true,
                classes: true,
            },
        });
        res.json(teachers);
    }
    catch (error) {
        res.status(500).json({ message: `Error retrieving teachers: ${error.message}` });
    }
});
exports.getTeachers = getTeachers;
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, name, surname, email, phone, address, img, bloodType, sex, subjects, birthday, } = req.body;
    try {
        const newTeacher = yield prisma.teacher.create({
            data: {
                id,
                username,
                name,
                surname,
                email,
                phone,
                address,
                img,
                bloodType,
                sex,
                subjects,
                birthday,
            },
        });
        res.status(201).json(newTeacher);
    }
    catch (error) {
        res.status(500).json({ message: `Error creating teacher: ${error.message}` });
    }
});
exports.createTeacher = createTeacher;
