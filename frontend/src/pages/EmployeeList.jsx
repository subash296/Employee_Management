import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


import Navbar from '../components/Navbar'
import Dropdown from '../components/Dropdown'


function EmployeeDetails() {


  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('f_Id');
  const [order, setOrder] = useState('desc');
  const[totalUsers,setTotalUsers]=useState(0)
  const [limit, setLimit] = useState(3);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate()

 

  const handleDelete=(id)=>{
    try
    {
    axios.delete(`/api/employee/delete/${id}`,{
      withCredentials: true
    })
    
    toast.success("Employee deleted successfully!")
    setPage(1)
    setReload((prev) => !prev);
    
  
  }
    catch(error){
      console.log(error.message)
     
    }
  }
  const handleEdit=(userDetail)=>{
    navigate(`/updateemployee`,{state:{userDetail}})
  }

  

 
 

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const response = await axios.get('http://localhost:3000/api/employee/get', {
          params: { search, page, sortBy, order, limit },
          withCredentials: true
        });
        const data = response.data;
        
     
        setTotalUsers(response.data.total)
        setTotalPages(data.totalPages);
        
        setUsers(data.data);
        return data;
        
      } catch (error) {
        console.log(error.message)
        if (error.response) {
          throw new Error(error.response.data?.message || "Something went wrong");
        } else if (error.request) {
          throw new Error("No response received from server");
        } else {
          throw new Error(error.message || "An error occurred while sending data");
        }
        
      }
      
    }
    fetchData();
     
  }, [search, page, sortBy, order, limit,reload]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); 
    }
  };

  



  
  return (
   <div className='w-full mb-10 '>
      <Navbar />
      <h2 className='bg-blue-500 py-4 text-white text-center font-semibold text-2xl'>Employee List</h2>
      <div className="flex py-4 items-center justify-end gap-8 px-24">
        <p className='text-2xl'>Total Count: {totalUsers}</p>
        <button className='bg-[var(--green)] text-white rounded-md px-4 py-2'><Link to="/createemployee">Create Employee</Link></button>
      </div>
      <div className="flex py-1 items-center justify-end gap-8 px-24 bg-gray-300">
        <Dropdown sortBy={sortBy} setSortBy={setSortBy}  />
        <input type="text" name="search" id="search" placeholder='Search' className='border border-gray-300 px-4 py-2 outline-none rounded-lg h-8' value={search} onChange={(e) => setSearch(e.target.value)}  />
        <input type="text" name="search" id="search" placeholder='Enter Limit per page' className='border border-gray-300 px-4 py-2 outline-none rounded-lg h-8' value={limit} onChange={(e) => setLimit(e.target.value)}  />
      </div>
     
      
      <div className='w-[95%] '>
        <table className='w-full  border border-gray-300 border-collapse mt-10 relative left-8'>
          <thead>
          <tr className='border border-gray-300 '>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Unique Id</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Image</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Name</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Email</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Mobile No</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Designation</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Gender</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Course</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Status</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Create date</th>
            <th className='border border-gray-300 font-semibold text-xl py-2 pl-2'>Action</th>
          </tr>
          </thead>
          <tbody>
            {users.map((user) => (
            <tr key={user.f_Id}>
              <td className="border border-gray-300 text-xl py-2 pl-2">{user.f_Id}</td>
              <td className="border border-gray-300 text-xl py-2 pl-2"><img src={user.f_Image ||"/avatar-placeholder.png"} alt="User Icon" className='w-20 h-20' /></td>
              <td className="border border-gray-300 text-xl py-2 pl-2">{user.f_Name}</td>
              <td className="border border-gray-300 text-xl py-2 pl-2">{user.f_Email}</td>
              <td className="border border-gray-300 text-xl py-2 pl-2">{user.f_Mobile}</td>
              <td className="border border-gray-300 text-xl py-2 pl-2">{user.f_Designation}</td>
              <td className="border border-gray-300 text-xl py-2 pl-2">{user.f_Gender}</td>
              <td className="border border-gray-300 text-xl py-2 pl-2">
              {user.f_Course.map((course,index) => (
                <span key={index}>{course},</span>
                
              ))}
              </td>
              <td className="border border-gray-300 text-xl h-24 flex justify-center items-center"><p className={`w-4 h-4 rounded-full ${user.f_Status ? 'bg-green-500' : 'bg-red-500'} bg-green-500`}></p></td>
              <td className="border border-gray-300 text-xl py-2 pl-2">{new Date(user.f_createDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 text-xl py-2 pl-2"><div className="flex gap-3"><button className='px-3 py-1 rounded-2xl bg-[var(--yellow)] text-white' onClick={() => handleEdit(user)}>Edit</button><button onClick={() =>handleDelete(user.f_Id)} className='px-2 py-1 rounded-2xl bg-[var(--red)] text-white'>delete</button></div></td>

              

            </tr>
            ))}
          </tbody>
        </table>  
        <div className="flex justify-center items-center mt-4 space-x-2">
 
            <button
              className={`px-4 py-2 border rounded ${page === 1 ? 'text-gray-500' : 'text-blue-500'}`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>


            <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>


            <button
              className={`px-4 py-2 border rounded ${page === totalPages ? 'text-gray-500' : 'text-blue-500'}`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>


            <div className="flex items-center space-x-2">

    <input
      type="number"
      value={page}
      onChange={(e) => {
        const newPage = Math.max(1, Math.min(Number(e.target.value), totalPages));
        setPage(newPage);  
      }}
      min="1"
      max={totalPages}
      className="w-12 px-2 py-1 border rounded text-center"
    />
    <span>of {totalPages}</span>
       </div>
</div>


        
      </div>

    </div>
  )
}

export default EmployeeDetails