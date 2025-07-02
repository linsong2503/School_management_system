"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const router = (0, express_1.Router)();
router.get("/", teacherController_1.getTeachers);
exports.default = router;
