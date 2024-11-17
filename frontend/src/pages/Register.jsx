
import React, { useState } from 'react'
import axios from 'axios'
import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import { Link,useNavigate } from 'react-router-dom'



function Register() {
    const[user,setUser]=useState({
        f_username:"",
        f_password:""}
    )
    const navigate = useNavigate();
    const { mutate,error} = useMutation({
        mutationFn: async (user) => {
          try {
            const response = await axios.post("/api/admin/register",user);
      
            const data = response.data; 
         
            return data;
          } catch (error) {
            console.error(error);
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
          toast.success("Account created successfully");
          navigate("/login");
          
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.error || error.message || "An error occurred during account creation";
            toast.error(errorMessage);
        }
      });
   

 
  return (
   <div className='container h-screen w-full  '>
    <h2 className='bg-blue-500 py-4 text-white text-center font-semibold text-2xl'>Register Page</h2>
         <div className='flex  justify-center  relative top-32  '>

            <form className='flex flex-col gap-5 shadow-lg p-10' onSubmit={(e)=>{e.preventDefault();mutate(user)}} >
                <div className='flex gap-9'>
                <label htmlFor='f_username'className='text-2xl'>Username</label> 
                <input type="text" name="f_username" value={user.f_username} onChange={(e)=>setUser({...user,f_username:e.target.value})} id="f_username"className=' border-2 border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ' required />
                </div>
                <div className='flex gap-9'>
                <label htmlFor="f_password"className='text-2xl'>Password</label>
                <input type="password" name="f_password" id="f_password" value={user.f_password} onChange={(e)=>setUser({...user,f_password:e.target.value})} className='ml-2 border-2 border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ' required />
                </div>
                <div className='flex justify-center'>
                <button type="submit"className='bg-blue-500 py-2 w-1/2 rounded-xl text-white text-center font-semibold text-2xl'>Register</button>
                </div>
                <div className="flex justify-center">
                    <button type="submit"className='hover:bg-blue-500 border:blue-500 border hover:border-none text-blue-500  py-2 w-1/2 rounded-xl hover:text-white text-center font-semibold text-2xl'><Link to="/login">Login</Link></button>
                </div>
              
            </form>
         </div>

   </div>
  )
}

export default Register