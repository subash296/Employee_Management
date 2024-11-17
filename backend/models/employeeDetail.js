import mongoose from "mongoose";

const employeeDetailSchema=new mongoose.Schema({
   
    f_Id:{
        type:Number,
        unique:true,
        required:true
    },
    f_Image:{
        type:String,
        default:""
    },
    f_Name:{
        type:String,
        required:true
    },
    f_Email:{
        type:String,
        unique:true,
        required:true
    },
    f_Mobile:{
        type:Number,
        unique:true,
        required:true
    },
    f_Designation:{
        type:String,
        required:true
    },
    f_Gender:{
        type:String,
        required:true
    },
    f_Course:[{
        type:String,
        required:true,
        
    }],
    f_Status:{
        type:Boolean,
        default:false
    },
    f_createDate:{
        type:Date,
        default:Date.now
    }
   
}
,{timestamps:true})
const EmployeeDetail=mongoose.model("EmployeeDetail",employeeDetailSchema);
export default EmployeeDetail;