import { Router } from "express";
import { getStudents, getStudentById } from "../controllers/studentController";

const router = Router();

router.get("/", getStudents);
router.get("/students/:id", getStudentById);
export default router;
