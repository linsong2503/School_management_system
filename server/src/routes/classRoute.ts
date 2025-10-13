import { getClass } from "../controllers/classController";
import { Router } from "express";

const router = Router();
router.get("/", getClass);
export default router;
