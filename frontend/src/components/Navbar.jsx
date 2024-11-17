import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

function Navbar() {
  const queryClient=useQueryClient()
  const navigate=useNavigate()
  const logOut=async()=>{
    try {
     await axios.post("/api/admin/logout")
     localStorage.removeItem("authAdmin") 
     queryClient.invalidateQueries({ queryKey: ["authAdmin"] });
     navigate("/login")
    } catch (error) {
      console.log(error.message)
    }
    
  }
  return (
    <nav className='flex justify-between items-center px-5 '>
      <div>
        <img src="/logo.png" alt="Logo" className='w-14 h-14' />
      </div>
      <p className='text-xl'><Link to="/">Home</Link></p>
      <p className='text-xl'><Link to="/employee">Employee List</Link></p>
      <div className='flex gap-2 group hover:cursor-pointer'onClick={logOut}>
      <button className='outline-none'>Logout </button>
      <IoIosLogOut className='text-3xl   group-hover:text-red-600' />

      </div>
     

    </nav>
  )
}

export default Navbar