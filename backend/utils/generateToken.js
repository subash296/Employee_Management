import jwt from "jsonwebtoken"
const generateToken=async(userId,res)=>{
    try {
        const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("jwt",token,{httpOnly:true,maxAge:24*60*60*1000,sameSite:"strict",secure:process.env.NODE_ENV!=="development"})

        
    } catch (error) {
        console.log(`error in generating token ${error.message}`)
        res.status(500).json({message:"Internal Server Error"})
        
    }
}
export default generateToken


