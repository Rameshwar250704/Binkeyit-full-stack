  import React, { useState } from 'react'
  import { FaUser } from 'react-icons/fa'
  import { useDispatch, useSelector } from 'react-redux'
  import SummaryApi from '../common/SummaryApi'
  import Axios from "../utils/Axios"
  import AxiosToastError from "../utils/AxiosToastError"
  import { updateavatar } from '../store/userSlice'
  import { IoIosClose } from "react-icons/io";


  const UserProfileAvatarEdit = ({  close}) => {
      const user=useSelector(state=>state.user)
      const dispatch= useDispatch()
      const [loading,setloading]=useState(false)
      const handleSubmit=(e)=>{
          e.preventDefault()
      }
      const handleUploadAvtarImage=async (e)=>{
        const file=e.target.files[0]
        const formData=new FormData()
          formData.append("avatar",file)


        try {
          setloading(true)
          const response=await Axios({
          ...SummaryApi.uploadAvatar,
          data:formData
          
          
        }) 
          const avatar = response.data?.data?.avatar;
          dispatch(updateavatar(avatar));

          
        } catch (error) {
          AxiosToastError(error)
          
        }  finally{
      setloading(false)

        }
        

      
    }
    return (
      <div>
      <section className='fixed top-0 bottom-0 left-0 right-0 p-4 flex items-center justify-center'>
          <div className=' max-w-sm w-full bg-green-200 rounded p-4 flex flex-col items-center justify-center'>
            <button onClick={close} className='text-black ml-auto'>
              <IoIosClose size={40}/>
            </button>
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
                  <form onSubmit={handleSubmit}>
                      <label htmlFor='uploadProfile'>
                          <div className='border border-amber-300 hover:bg-amber-500 px-4 py-1 rounded text-1xl my-3'>
                              
                              {
                                loading? "uploading":"Upload"
                              }
                          </div>
                      </label>
                          <input onChange={handleUploadAvtarImage} type='file' id='uploadProfile' className='hidden'/>
                      
                      
                  </form>
                  
          </div>



      </section>
      </div>  
    )
  }

  export default UserProfileAvatarEdit
