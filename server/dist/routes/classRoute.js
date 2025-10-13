"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classController_1 = require("../controllers/classController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", classController_1.getClass);
exports.default = router;
