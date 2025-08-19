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
exports.createParents = exports.getParents = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getParents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parents = yield prisma.parent.findMany({
            include: {
                students: true,
            },
        });
        res.json(parents);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error while retrieving parents: ${error.message}` });
    }
});
exports.getParents = getParents;
const createParents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, name, surname, email, phone, address, createdAt } = req.body;
    try {
        const newParents = yield prisma.parent.create({
            data: {
                id,
                username,
                name,
                surname,
                email,
                phone,
                address,
                createdAt,
            },
        });
        res.status(201).json({ message: `Created parents successfully!` });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating parents: ${error.message}` });
    }
});
exports.createParents = createParents;
