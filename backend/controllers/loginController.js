import Login from "../models/login.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"
export const login =async (req, res) => {
    try {
        const{f_username,f_password}=req.body
        if(!f_username || !f_password){
            return res.status(400).json({message:"All fields are required"})
        }

        const user=await Login.findOne({f_username})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const validatePassword=await bcrypt.compare(f_password,user.f_password)
        if(!validatePassword){
            return res.status(400).json({message:"Invalid Password"})
        }

        generateToken(user._id,res)

        res.status(200).json({
            message:"Login successful",
            user:user.f_username,
        })

    } catch (error) {
        console.log(`Error in login route ${error.message}`)
        res.status(500).json({message:"Internal Servor Error"})
        
    }
}
export const register=async(req,res)=>{
    try {
        const{f_username,f_password}=req.body
        if(!f_username || !f_password){
           return res.status(400).json({message:"All fields are required"})
        }
        if(f_password.length<6){
           return res.status(400).json({message:"Password must be at least 6 characters"})
        }


        const existingUser=await Login.findOne({f_username})
        if(existingUser){
           return res.status(400).json({message:"User already exists"})
        }
        
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(f_password,salt)
        const data=await Login.find()

        const user=new Login({
            f_sno:data ? data.length+1:1,
            f_username,
            f_password:hashedPassword
        })
        if(user){
            generateToken(user._id,res)
            await user.save()

        }
        
        res.status(201).json({
            message:"User created",
            user:f_username
        })
    } catch (error) {
        console.log(`Error in register route ${error.message}`)
        res.status(500).json({message:"Internal Servor Error"})
        
    }

    
}
export const getMe=async(req,res)=>{
    try {
        const user=req.user
 
  
    res.status(200).json({username:user.f_username})
        
    } catch (error) {
        console.log(`Error in getMe route ${error.message}`)
        res.status(500).json({message:"Internal Servor Error"})
    }
}
export const logout=async(req,res)=>{
    try {
        
        res.cookie("jwt",null,{maxAge:0}).json({message:"Logout successful"})
        
    } catch (error) {
        console.log(`Error in getMe route ${error.message}`)
        res.status(500).json({message:"Internal Servor Error"})
        
    }
}