import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FiExternalLink } from "react-icons/fi";
import isAdmin from '../utils/isAdmin'


const UserMenu = () => {
    const user=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogout=async ()=>{
      try {
        const response=await Axios({
          ...SummaryApi.logout
        })
        if(response.data.success){
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
          navigate('/')
          window.location.reload(); 

        }
        
      } catch (error) {
        AxiosToasrError(error)        
      }

    }
    const handleClose=()=>{
      if(close){
        close()
      }
    }
  return (
    <div>
      <div className='font font-semibold'>My Account</div>
        <div className='font font-light'>
            User:{user.name || user.mobile }<span className='text-red-700 font-semibold'>{user.role==='ADMIN'?'(Admin)':""}</span>
            <Link onClick={handleClose}to={'/dashboard/profile'} className='hover:text-amber-300'><FiExternalLink size={15} /></Link>
            
            </div>

            <Divider/>
      <div className='text-sm grid gap-2'>
        {
          isAdmin(user.role)&&
          <Link onClick={handleClose}to={"/dashboard/Category"} className='px-2 hover:bg-orange-100'>Category</Link>
        }
        {
          isAdmin(user.role)&&
         <Link onClick={handleClose}to={"/dashboard/Sub_category"} className='px-2 hover:bg-orange-100'>Sub Category</Link>
        }
        {
          isAdmin(user.role)&&
        <Link onClick={handleClose}to={"/dashboard/Upload_product"} className='px-2 hover:bg-orange-100'>upload Product</Link>
        }
        {
          isAdmin(user.role)&&
        <Link onClick={handleClose}to={"/dashboard/Products"} className='px-2 hover:bg-orange-100'>products</Link>
        }
       
        <Link onClick={handleClose}to={"/dashboard/myorder"} className='px-2 hover:bg-orange-100'>My Order</Link>
        <Link onClick={handleClose}to={"/dashboard/address"} className='px-2 hover:bg-orange-100'>Address</Link>
        <button onClick={handleLogout}className='text-left bg-white px-2 hover:bg-orange-100'>Log-Out</button>
      </div>
    </div>
  )
}

export default UserMenu
