import { Router } from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
} from "../controllers/studentController";

const router = Router();

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
export default router;
