import { Router } from "express";
import { getDoctors,getDoctor,addDoctor,updateDoctor,deleteDoctor } from "../controllers/doctorcontroller";
import { verifyToken } from "../middleware/authMiddleWare";
const router=Router();
router.get("/",getDoctors); router.get("/:id",getDoctor); router.post("/",verifyToken,addDoctor); router.put("/:id",verifyToken,updateDoctor); router.delete("/:id",verifyToken,deleteDoctor);
export default router;
