import { Router } from "express";
import { login,register,getMe, logout } from "../controllers/loginController.js";
import  protectedRoute  from "../middleware/protectedRoute.js";

const router = Router();

router.post("/login",login)
router.post("/register",register)
router.get("/getMe",protectedRoute,getMe)
router.post("/logout",logout)
export default router