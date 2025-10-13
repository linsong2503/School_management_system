"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subjectController_1 = require("../controllers/subjectController");
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.get("/", subjectController_1.getSubjects);
exports.default = router;
