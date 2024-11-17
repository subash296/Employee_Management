import React, { useState,useRef } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query';
import Navbar from '../components/Navbar'

import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from 'react-toastify';


function CreateEmployee() {
    const [user,setUser]=useState({
        f_Id:"",
        f_Name:"",
        f_Email:"",
        f_Image:"",
        f_Mobile:"",
        f_Designation:"",
        f_Gender:"",
        f_Course:[],
        f_Status:false
    })
    const [img, setImg] = useState(null);
  const [isError, setIsError] = useState(null);
  const imgRef = useRef(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
     
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setIsError("Only JPG and PNG files are allowed.");
        setImg(null);
        imgRef.current.value = null; 
        return;
      }
  
     
      setIsError(null);
  

      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result); 
        setUser((prevState) => ({
          ...prevState,
          f_Image: reader.result, 
        }));
      };
      reader.readAsDataURL(file); 
    }
  };
  
        
        

      
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (user) => {
      try {
        

        const response = await axios.post("/api/employee/add", user);

        console.log("Response Data:", response.data);
        return response.data; 
      } catch (error) {
        console.error("Error occurred:", error);

        if (error.response) {
          throw new Error(error.response.data?.message || "Something went wrong");
        } else if (error.request) {
          throw new Error("No response received from server");
        } else {
          throw new Error(error.message || "An error occurred while sending data");
        }
      }
    },
    onSuccess: () => {
      toast.success("Employee created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setUser((prevUser) => {
          let updatedCourses = [...prevUser.f_Course];
    
          if (checked) {
            
            updatedCourses.push(value);
          } else {
      
            updatedCourses = updatedCourses.filter((course) => course !== value);
          }
    
          return { ...prevUser, f_Course: updatedCourses };
        });
      };
      
     
   
  return (
    <div className='container h-screen w-full  '>
        <Navbar />
        <h2 className='bg-blue-500 py-4 text-white text-center font-semibold text-2xl'>Create Employee</h2>
        <div className='flex justify-center'>
            <div className='w-[550px] rounded-md shadow-lg p-6 mt-10'>
            <form onSubmit={(e) => {e.preventDefault(), mutate(user)}} className='w-full'>
                <div className="flex my-2 ">
                    <label htmlFor="id" className="basis-1/2 text-gray-600 font-semibold mb-1"required>Id</label>
                    <input type="text" id="id" name="id" className="basis-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" value={user.f_Id} onChange={(e) => setUser({ ...user, f_Id: e.target.value })} />
                </div>
                <div className="flex  my-2">
                    <label htmlFor="username" className="basis-1/2 text-gray-600 font-semibold mb-1"required>Username</label>
                    <input type="text" id="username" name="username" className="basis-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" value={user.f_Name} onChange={(e) => setUser({ ...user, f_Name: e.target.value })} />
                </div>
                <div className="flex  my-2">
                    <label htmlFor="email" className="basis-1/2 text-gray-600 font-semibold mb-1" required>Email</label>
                    <input type="email" id="email" name="email" className="basis-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" value={user.f_Email} onChange={(e) => setUser({ ...user, f_Email: e.target.value })} />
                </div>
                <div className="flex  my-2">
                    <label htmlFor="mobile" className="basis-1/2 text-gray-600 font-semibold mb-1"required>Mobile</label>
                    <input type="text" id="mobile" name="mobile" className="basis-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" value={user.f_Mobile} onChange={(e) => setUser({ ...user, f_Mobile: e.target.value })} />
                </div>
                <div className='my-2 flex w-full border-t pt-2'>
                    <p className=" text-gray-600 font-semibold mb-1 basis-1/2">Designation</p>
                    <div className='flex flex-col basis-1/2 '>
                        <div className='w-full'>
                            <label  htmlFor="HR" className='text-gray-600  mb-1 basis-1/2'>HR</label>
                            <input type="radio" name='Designation' id='HR' value='HR' className='ml-20 basis-1/2' onClick={(e) => setUser({ ...user, f_Designation: e.target.value })}  />

                        </div>
                        <div className='w-48'>
                            <label htmlFor="Manager" className='text-gray-600  mb-1 basis-1/2'>Manager</label>
                            <input type="radio" name='Designation' id='Manager' value='Manager' className='ml-7 basis-1/2' onClick={(e) => setUser({ ...user, f_Designation: e.target.value })}  />
                        </div>
                        <div className='w-32'>
                            <label htmlFor="Sales" className='text-gray-600  mb-1 basis-1/2'>Sales</label>
                            <input type="radio" name='Designation' id='Sales' value='Sales' className='ml-[58px] basis-1/2' onClick={(e) => setUser({ ...user, f_Designation: e.target.value })}  />
                        </div>
                        
                        
                        
                    </div>

                </div>
                <div className='my-2 flex w-full border-t pt-2'>
                    <p className=" text-gray-600 font-semibold mb-1 basis-1/2">Gender</p>
                    <div className='flex flex-col basis-1/2 '>
                        <div className='w-full'>
                            <label  htmlFor="Male" className='text-gray-600  mb-1 basis-1/2'>Male</label>
                            <input type="radio" name='Gender' id='Male' value='Male' onClick={(e) => setUser({ ...user, f_Gender: e.target.value })} className='ml-14 basis-1/2'  />

                        </div>
                        <div className='w-48'>
                            <label htmlFor="Female" className='text-gray-600  mb-1 basis-1/2'>Female</label>
                            <input type="radio" name='Gender' id='Female' value="Female" onClick={(e) => setUser({ ...user, f_Gender: e.target.value })} className='ml-9 basis-1/2' />
                        </div> 
                        
                    </div>

                </div>
                <div className='my-2 flex w-full border-t pt-2'>
                    <p  className=" text-gray-600 font-semibold mb-1 basis-1/2">Course</p>
                    <div className='flex  basis-1/2'>
                    <label htmlFor="MBA" className='text-gray-600  mb-1 '>MCA</label>
                    <input type="checkbox" id="Course" name="MCA" className='ml-7 basis-1/2' value="MCA" checked={user.f_Course.includes('MCA')}
            onChange={handleCheckboxChange}/>
                    </div>
                    <div className='flex  basis-1/2'>
                    <label htmlFor="MBA" className='text-gray-600  mb-1 '>BCA</label>
                    <input type="checkbox" id="Course" name="BCA" className='ml-7 basis-1/2' value="BCA" checked={user.f_Course.includes('BCA')}
            onChange={handleCheckboxChange} />
                    </div>
                    <div className='flex  basis-1/2'>
                    <label htmlFor="BSC" className='text-gray-600  mb-1 '>BSC</label>
                    <input type="checkbox" id="Course" name="MCA" className='ml-7 basis-1/2' value="BSC" checked={user.f_Course.includes('BSC')}
            onChange={handleCheckboxChange} />
                    </div>
         
                    
                </div>
                <div className='my-2 flex w-full border-t pt-2'>
                    <p className=" text-gray-600 font-semibold mb-1 basis-1/2">Status</p>
                    <div className='flex flex-col basis-1/2 '>
                        <div className='w-full'>
                            <label  htmlFor="Active" className='text-gray-600  mb-1 basis-1/2'>Active</label>
                            <input type="radio" name='Status' id='Active' value='Active' onClick={(e) => setUser({ ...user, f_Status: true })} className='ml-14 basis-1/2'  />

                        </div>
                        <div className='w-48'>
                            <label htmlFor="Deactive" className='text-gray-600  mb-1 basis-1/2'>Deactive</label>
                            <input type="radio" name='Status' id='Deactive' value="Deactive" onClick={(e) => setUser({ ...user, f_Status:false })} className='ml-9 basis-1/2' />
                        </div> 
                        
                    </div>

                </div>
                <div className='my-2 flex w-full border-t pt-2 '>
                    <label htmlFor="image" className='text-gray-600 font-semibold  mb-1 basis-1/2'>Image  Upload</label>
                    <div className="flex flex-col items-center p-1">
                                {isError && (
                                    <div className="text-red-500 text-sm mb-2">{isError}</div>
                                )}

                                <div className="flex gap-2 items-center">
                                  
                                    <CiImageOn
                                    className="fill-primary w-6 h-6 cursor-pointer"
                                    onClick={() => imgRef.current.click()}
                                    />
                                    
                                </div>

                                
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    ref={imgRef}
                                    onChange={handleImgChange}
                                />

                                
                                {img && (
                                    <div className="relative w-72 mx-auto mt-4">
                                  
                                    <IoCloseSharp
                                        className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                                        onClick={() => {
                                        setImg(null);
                                        imgRef.current.value = null;
                                        }}
                                    />
                                    <img src={img} className="w-full mx-auto h-72 object-contain rounded" />
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Submit</button>
                </div>
               
            </form>

            </div>
            
        </div>

    </div>
  )
}

export default CreateEmployee