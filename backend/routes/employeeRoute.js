import { Router } from "express";
import { add,get,update,deleteUser } from "../controllers/employeeController.js";
import  protectedRoute  from "../middleware/protectedRoute.js";
const router=Router()

router.post("/add",protectedRoute,add)
router.get("/get",protectedRoute,get)
router.put("/update/:id",protectedRoute,update)
router.delete("/delete/:id",protectedRoute,deleteUser)


export default router