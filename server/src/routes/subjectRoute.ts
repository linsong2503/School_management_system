import { getSubjects } from "../controllers/subjectController";
import Router from "express"

const router = Router();

router.get("/",getSubjects)

export default router;