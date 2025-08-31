"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parentController_1 = require("../controllers/parentController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", parentController_1.getParents);
router.post("/", parentController_1.createParents);
exports.default = router;
