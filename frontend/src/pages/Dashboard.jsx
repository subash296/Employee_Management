import React from 'react'
import Navbar from '../components/Navbar';

function Dashboard() {
  const username=localStorage.getItem("authAdmin");

  return (
    <div className='w-full h-screen'>
    <Navbar />
    <h2 className='bg-blue-500 py-4 text-white text-center font-semibold text-2xl'>Dadh Board</h2>
    <div className='w-full  flex justify-center relative top-48'>

      <p className='text-4xl font-semibold font-mono'>Welcome {username}</p>

    </div>
    
   
   

    </div>
  )
}

export default Dashboard