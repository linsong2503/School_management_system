import { getParents,createParents, updateParents,updateParentsStatus } from "../controllers/parentController";
import { Router } from "express";

const router = Router();

router.get("/",getParents);
router.post("/",createParents);
router.put("/:id",updateParents);
router.patch("/:id",updateParentsStatus)
export default router;