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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //Admin
        yield prisma.admin.create({
            data: {
                id: "admin1",
                username: "admin1",
            },
        });
        yield prisma.admin.create({
            data: {
                id: "admin2",
                username: "admin2",
            },
        });
        yield prisma.admin.create({
            data: {
                id: "admin3",
                username: "admin3",
            },
        });
        // Grade
        for (let i = 1; i <= 5; i++) {
            yield prisma.grade.create({
                data: {
                    level: i,
                },
            });
        }
        // Class
        for (let i = 1; i <= 5; i++) {
            yield prisma.class.create({
                data: {
                    name: `${i}A`,
                    capacity: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
                    gradeId: i,
                },
            });
        }
        for (let i = 1; i <= 5; i++) {
            yield prisma.class.create({
                data: {
                    name: `${i}B`,
                    capacity: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
                    gradeId: i,
                },
            });
        }
        for (let i = 1; i <= 5; i++) {
            yield prisma.class.create({
                data: {
                    name: `${i}C`,
                    capacity: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
                    gradeId: i,
                },
            });
        }
        // Subject
        const subjectData = [
            { name: "Mathematics" },
            { name: "Physics" },
            { name: "Chemistry" },
            { name: "Biology" },
            { name: "History" },
            { name: "Literature" },
        ];
        for (const p_subject of subjectData) {
            yield prisma.subject.create({
                data: p_subject,
            });
        }
        // TEACHER
        for (let i = 1; i <= 25; i++) {
            yield prisma.teacher.create({
                data: {
                    id: `teacher${i}`, // Unique ID for the teacher
                    username: `teacher${i}`,
                    name: `TName${i}`,
                    surname: `TSurname${i}`,
                    email: `teacher${i}@edu.vn`,
                    phone: `097-456-333${i}`,
                    address: `Address${i}`,
                    bloodType: "A+",
                    sex: i % 2 === 0 ? client_1.UserSex.MALE : client_1.UserSex.FEMALE,
                    subjects: { connect: [{ id: (i % 6) + 1 }] },
                    classes: { connect: [{ id: (i % 15) + 1 }] },
                    birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
                },
            });
        }
        // Lesson
        for (let i = 1; i <= 25; i++) {
            yield prisma.lesson.create({
                data: {
                    name: `Lesson ${i}`,
                    day: client_1.Day[Object.keys(client_1.Day)[Math.floor(Math.random() * Object.keys(client_1.Day).length)]],
                    startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
                    endTime: new Date(new Date().setHours(new Date().getHours() + 2.5)),
                    subjectId: (i % 6) + 1,
                    classId: (i % 15) + 1,
                    teacherId: `teacher${(i % 25) + 1}`,
                },
            });
        }
        // PARENT
        for (let i = 1; i <= 300; i++) {
            yield prisma.parent.create({
                data: {
                    id: `parentId${i}`,
                    username: `parentId${i}`,
                    name: `PName ${i}`,
                    surname: `PSurname ${i}`,
                    email: `parent${i}@edu.vn`,
                    phone: `034-995-789${i}`,
                    address: `Address${i}`,
                },
            });
        }
        // Student
        for (let i = 1; i <= 300; i++) {
            yield prisma.student.create({
                data: {
                    id: `student${i}`,
                    username: `student${i}`,
                    name: `SName${i}`,
                    surname: `SSurname ${i}`,
                    email: `student${i}@edu.vn`,
                    phone: `094-364-321${i}`,
                    address: `Address${i}`,
                    bloodType: "O-",
                    sex: i % 2 === 0 ? client_1.UserSex.MALE : client_1.UserSex.FEMALE,
                    parentId: `parentId${Math.ceil(i / 2) % 50 || 50}`,
                    gradeId: (i % 5) + 1,
                    classId: (i % 15) + 1,
                    birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
                },
            });
        }
        // Exam
        for (let i = 1; i <= 10; i++) {
            yield prisma.exam.create({
                data: {
                    title: `Exam ${i}`,
                    startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
                    endTime: new Date(new Date().setHours(new Date().getHours() + 1.5)),
                    lessonId: (i % 30) + 1,
                },
            });
        }
        // Assignment
        for (let i = 1; i <= 10; i++) {
            yield prisma.assignment.create({
                data: {
                    title: `Assignment ${i}`,
                    startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
                    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                    lessonId: (i % 30) + 1,
                },
            });
        }
        // Result
        for (let i = 1; i <= 10; i++) {
            yield prisma.result.create({
                data: Object.assign({ score: 90, studentId: `student${i}` }, (i <= 5 ? { examId: i } : { assignmentId: i - 5 })),
            });
        }
        // Attendance
        for (let i = 1; i <= 10; i++) {
            yield prisma.attendance.create({
                data: {
                    date: new Date(),
                    present: true,
                    studentId: `student${i}`,
                    lessonId: (i % 30) + 1,
                },
            });
        }
        // Event
        for (let i = 1; i <= 10; i++) {
            yield prisma.event.create({
                data: {
                    title: `Event${i}`,
                    description: `Description for Event ${i}`,
                    startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
                    endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
                },
            });
        }
        // Announcement
        for (let i = 1; i <= 5; i++) {
            yield prisma.announcement.create({
                data: {
                    title: `Announcement ${i}`,
                    description: `Description for Announcement ${i}`,
                    date: new Date(),
                    classId: (i % 5) + 1,
                },
            });
        }
        console.log("Seeding completed successfully.");
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
