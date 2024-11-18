import employeeDetail from "../models/employeeDetail.js";

import {v2 as cloudinary} from "cloudinary"

export const add=async (req, res) => {
    try {
        const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender,f_Course,f_Id,f_Status } = req.body;
        let { f_Image } = req.body;
        if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_Gender || !f_Course || !f_Id) {
            return res.status(400).json({ message: "All fields are required" })  
        }

        const existingEmail = await employeeDetail.findOne({ f_Email });
        const existingMobile = await employeeDetail.findOne({ f_Mobile });
        const existingId = await employeeDetail.findOne({ f_Id });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(f_Email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}
        if (existingMobile) {
            return res.status(400).json({ message: "Mobile number already exists" });
        }
        if (existingId) {
            return res.status(400).json({ message: "Id already exists" });
        }
        if(f_Mobile.length!==10){
            return res.status(400).json({message:"Mobile number must be 10 digits"})
        }
        if(!/^\d{10}$/.test(f_Mobile)){
            return res.status(400).json({message:"Mobile number must be a number"})
            
        }
        
        
        if (f_Image) {
              
            try {
             
              const result = await cloudinary.uploader.upload(f_Image);
             
              f_Image = result.secure_url; 
            
            } catch (err) {
              console.error("Cloudinary upload error:", err);
              return res.status(500).json({ message: "Error uploading image to Cloudinary" });
            }
          }
          const newEmployee={
            f_Name,f_Email,f_Mobile,f_Designation,f_Gender,f_Course,f_Id,f_Status,f_Image

        }
        
        if (req.body.f_Status) {
            newEmployee.f_Status = req.body.f_Status;
        }

        const employee = new employeeDetail(newEmployee);
        await employee.save();

        res.status(201).json({
            message: "Employee added successfully",
            data: employee
        })
     


    } catch (error) {
        console.log(`error in add employee ${error.message}`)
        res.status(500).json({ message: "Internal Servor Error" })
    }

}


export const update=async (req, res) => {
    try {
        const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender,f_Course,f_Id,f_Status } = req.body;
        let{ f_Image } = req.body;
        const userId=req.params.id
        const user=await employeeDetail.findById(userId)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(f_Email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}
       
        if(f_Mobile && !/^\d{10}$/.test(f_Mobile)){
            return res.status(400).json({message:"Mobile number must be a number"})
            
        }
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        if (f_Image && f_Image.length !==0) {

            if(user.f_Image){
            await cloudinary.uploader.destroy(user.f_Image.split("/").pop().split(".")[0]);
            }
            const result = await cloudinary.uploader.upload(f_Image);
            user.f_Image = result.secure_url;
         }
        

        user.f_Name=f_Name || user.f_Name;
        user.f_Email=f_Email || user.f_Email;
        user.f_Mobile=f_Mobile || user.f_Mobile;
        user.f_Designation=f_Designation || user.f_Designation;
        user.f_Gender=f_Gender || user.f_Gender;
        user.f_Course=f_Course || user.f_Course;
        user.f_Id=f_Id || user.f_Id;
        user.f_Status=f_Status || user.f_Status;
        user.f_Image=  user.f_Image;

        await user.save()
        return res.status(200).json({message:"Employee details updated successfully",data:user})
    } catch (error) {
        console.log(`error in update employee ${error.message}`)
        res.status(500).json({ message: "Internal Servor Error" })
        
    }
}
export const deleteUser = async (req, res) => {
    try {
        const userId=req.params.id
        const user=await employeeDetail.findOne({f_Id:userId})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        if(user.f_Image){
            await cloudinary.uploader.destroy(user.f_Image.split("/").pop().split(".")[0]);
        }
        await employeeDetail.findByIdAndDelete(user._id)
        res.status(200).json({message:"Employee deleted successfully"})
        
    } catch (error) {
        console.log(`error in delete employee ${error.message}`)
        res.status(500).json({ message: "Internal Servor Error" })
    }

}
export const get=async(req,res)=>{
    try {
        const { page = 1, limit = 6, search = '', sortBy = 'f_Id', sortOrder = 'asc' } = req.query;
        const filter = search
            ? {
                  $or: [
                      { f_Name: { $regex: search, $options: 'i' } },  
                      { f_Email: { $regex: search, $options: 'i' } }, 
                      
                  ],
              }
            : {};
            
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1; 

        const skip = (page - 1) * limit;
        const employees = await employeeDetail.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort(sort);

        const totalEmployees = await employeeDetail.countDocuments(filter);

        res.json({
            data: employees,
            total: totalEmployees,
            page: parseInt(page),
            totalPages: Math.ceil(totalEmployees / limit),
        });
    } catch (error) {
        console.log(`error in get employee ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}
