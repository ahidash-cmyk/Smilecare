import { Router } from "express";
import { getServices,getServiceById,addService,updateService,deleteService } from "../controllers/serviceController";
import { verifyToken } from "../middleware/authMiddleWare";
const router=Router();
router.get("/",getServices); router.get("/:id",getServiceById); router.post("/",verifyToken,addService); router.put("/:id",verifyToken,updateService); router.delete("/:id",verifyToken,deleteService);
export default router;
