import { getParents,createParents } from "../controllers/parentController";
import { Router } from "express";

const router = Router();

router.get("/",getParents);
router.post("/",createParents)
export default router;