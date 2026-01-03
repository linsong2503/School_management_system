import { Router } from "express";
import { getLessons, getLessonsById } from "../controllers/lessonsController";

const router = Router();
router.get("/", getLessons);
router.get("/:id",getLessonsById)
export default router;
