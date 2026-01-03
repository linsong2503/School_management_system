"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lessonsController_1 = require("../controllers/lessonsController");
const router = (0, express_1.Router)();
router.get("/", lessonsController_1.getLessons);
router.get("/:id", lessonsController_1.getLessonsById);
exports.default = router;
