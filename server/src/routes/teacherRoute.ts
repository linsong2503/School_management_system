import { Router } from "express";
import { getTeachers } from "../controllers/teacherController";

const router = Router();

router.get("/",getTeachers);

export default router;