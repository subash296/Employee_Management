import jwt from "jsonwebtoken";
import Login from "../models/login.js";
const protectedRoute=async(req,res,next)=>{
   try {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({message:"Invalid Token"})
    }
    const user=await Login.findById(decoded.userId).select("-f_password")
    if(!user){
        return res.status(401).json({message:"User not found"})
    }
    req.user=user
    next()
    
   } catch (error) {
    console.log(`error in protectroute middleware ${error.message}`)
    res.status(500).json({message:"Internal Server Error"})
    
   }

}

export default protectedRoute