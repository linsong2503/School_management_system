import { getParents } from "../controllers/parentController";
import { Router } from "express";

const router = Router();

router.get("/",getParents);

export default router;