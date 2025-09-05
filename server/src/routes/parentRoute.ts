import { getParents,createParents, updateParents } from "../controllers/parentController";
import { Router } from "express";

const router = Router();

router.get("/",getParents);
router.post("/",createParents);
router.put("/:id",updateParents)
export default router;