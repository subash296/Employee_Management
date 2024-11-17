import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import EmployeeList from './pages/EmployeeList'
import CreateEmployee from './pages/CreateEmployee';
import UpdateEmployee from './pages/UpdateEmployee';


function App() {
  const { data: authAdmin,} = useQuery({
    queryKey: ["authAdmin"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/admin/getMe");
        const data = res.data;
        if (data.error) return null;
        if (res.status !== 200) {
          throw new Error(data.error || "Something went wrong");
        }
        if(data && data.username){
          localStorage.setItem("authAdmin", data.username);
        }
        console.log("authUser is here:", data.username);

        return data.username;
      } catch (error) {
        console.log(error.message);
        if (error.response) {
          throw new Error(error.response.data?.message || "Something went wrong");
        } else if (error.request) {
          throw new Error("No response received from server");
        } else {
          throw new Error(error.message || "An error occurred while sending data");
        }
      }
    },
    retry: false,
  });

 const username=localStorage.getItem("authAdmin") || authAdmin;
  return (
   <>
   <Routes>
    <Route path='/' element={username ? <Dashboard /> : <Navigate to="/login" /> } />
    <Route path='/register' element= {<Register /> } />
    <Route path='/login'element={<Login />} /> 
    <Route path='/employee' element={username ?<EmployeeList /> : <Navigate to="/login" />} />
    <Route path='createemployee' element={username ?<CreateEmployee />: <Navigate to="/login" />} />
    <Route path='/updateemployee' element={username ?<UpdateEmployee />: <Navigate to="/login" />} />
   </Routes>
   <ToastContainer />
   
   </>
    
  )
}

export default App