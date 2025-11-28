import Router from "express";
import { getGrade } from "../controllers/gradeController";

const router = Router();
router.get("/", getGrade);
export default router;
