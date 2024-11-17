import mongoose from "mongoose";

const loginSchema=new mongoose.Schema({
    f_sno:{
        type:Number,
        required:true,
        unique:true
    },
    f_username:{
        type:String,
        required:true,
        unique:true
    },
    f_password:{
        type:String,
        required:true
    }
},{timestamps:true})
const Login=mongoose.model("Login",loginSchema);
export default Login;