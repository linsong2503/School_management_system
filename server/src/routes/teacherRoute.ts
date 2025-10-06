import { Router } from "express";
import { getTeachers,createTeacher, updateTeacher, getTeacherById } from "../controllers/teacherController";

const router = Router();

router.get("/",getTeachers);
router.get("/:id",getTeacherById)
router.post("/",createTeacher);
router.put("/:id",updateTeacher)
export default router;