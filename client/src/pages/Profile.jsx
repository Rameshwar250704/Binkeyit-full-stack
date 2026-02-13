import React, { useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit'
import { useEffect } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToasrError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import { setUserDetails } from '../store/userSlice'
import fetchUserDetails from '../utils/fetchUserDetails'




const Profile = () => {
  const user=useSelector((state)=>state.user)
  const [openProfileAvatarEdit,setProfileAvatarEdit]=useState(false)
  const[userData,setuserData]=useState({
    name:user.name,
    email:user.email,
    mobile:user.mobile
  })
  const[loading,setloading]=useState(false)
  const dispatch=useDispatch()

  useEffect(()=>{
    setuserData({
    name:user.name,
    email:user.email, 
    mobile:user.mobile

    })
  },[user])

  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setuserData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })

  }


  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      setloading(true)
      const response=await Axios({
        ...SummaryApi.updateUser,
        data:userData
      })
      const {data:responseData}=response
      
      if(responseData.success){
        toast.success(responseData.message)
         const userData= await fetchUserDetails()
        dispatch(setUserDetails(userData.data.data))
      }
      
    } catch (error) {
      AxiosToasrError(error)
      
    }finally{
      setloading(false)
    }

  }
  return (
    <div className='p-4'>
    <div className='flex items-center justify-center  h-16 w-16 rounded-full overflow-hidden drop-shadow-sm'>
      {
        user.avatar ?(
          <img
          alt={user.name}
          src={user.avatar}
          className='h-full w-full '
          />
        ):(
           <FaUser size={40} />

        )
      }
      
     
      
    </div>
    <button onClick={()=>setProfileAvatarEdit(true)} className='text-xx  min-w-20 border-yellow-500 border px-3 py-1 rounded-full mt-5 hover:bg-amber-700'>edit</button>
    {
      openProfileAvatarEdit &&(
        <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>

      )
    }
    <form className='my-4'onSubmit={handleSubmit}>
      <div className='grid'>
        <label>Name</label>
        <input
        type="text"
        placeholder='Enter your name'
        className='p-2 bg-blue-200   border focus-within:border-black rounded'
        value={userData.name}
        name='name'
        onChange={handleOnChange}
        />
        <label htmlFor='email'>Email</label>
        <input
        type="email"
        id='email'
        placeholder='Enter your name'
        className='p-2 bg-blue-200   border focus-within:border-black rounded'
        value={userData.email}
        name='email'
         onChange={handleOnChange}
        />
        <label>Mobile</label>
        <input
        type="text"
        placeholder='Enter your name'
        className='p-2 bg-blue-200   border focus-within:border-black rounded'
        value={userData.mobile}
        name='mobile'
         onChange={handleOnChange}
        />

        <button className='border my-3 px-4 py-2 font-semibold hover:bg-blue-400'>
          {
            loading?"loading...":'Update'
          }
        </button>
      </div> 
    </form>

    
    </div>
  )
}

export default Profile
