import { Router } from "express";
import { getTeachers,createTeacher } from "../controllers/teacherController";

const router = Router();

router.get("/",getTeachers);
router.post("/",createTeacher);

export default router;