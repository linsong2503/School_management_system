import { getParents,createParents, updateParents, getParentById } from "../controllers/parentController";
import { Router } from "express";

const router = Router();

router.get("/",getParents);
router.get("/:id",getParentById);
router.post("/",createParents);
router.put("/:id",updateParents);
export default router;