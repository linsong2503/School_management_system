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
exports.updateParentsStatus = exports.updateParents = exports.createParents = exports.getParentById = exports.getParents = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getParents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parents = yield prisma.parent.findMany({
            where: {
                st: "A",
            },
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
const getParentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Pid = parseInt(req.params.id);
    try {
        const parent = yield prisma.parent.findUnique({
            where: {
                id: Pid,
            },
        });
        res.status(200).json(parent);
    }
    catch (e) {
        res.status(404).json({ message: `Error retrieving parent: ${e.message}` });
    }
});
exports.getParentById = getParentById;
const createParents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newParent = yield prisma.parent.create({
            data: req.body,
        });
        res.status(201).json(newParent);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating parent: ${error.message}` });
    }
});
exports.createParents = createParents;
const updateParents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ParentId = parseInt(req.params.id);
    const { username, name, surname, email, phone, address, updatedAt } = req.body;
    try {
        const updatedParent = yield prisma.parent.update({
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
    }
    catch (e) {
        res.status(500).json({ message: `Error updating parent: ${e.message}` });
    }
});
exports.updateParents = updateParents;
const updateParentsStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ParentId = parseInt(req.params.id);
    const { status } = req.body;
    try {
        const updatedParent = yield prisma.parent.update({
            where: {
                id: ParentId,
            },
            data: {
                st: status
            },
        });
        res.status(204).json(updatedParent);
    }
    catch (e) {
        res.status(500).json({ message: `Error updating parent: ${e.message}` });
    }
});
exports.updateParentsStatus = updateParentsStatus;
