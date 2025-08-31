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
