import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToasrError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate= useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = Object.values(data).every(el => el.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password must be the same!");
      return
    }


    
        try {
        const response= await Axios({
        ...SummaryApi.register,
        data:data
         })

         if(response.data.error){
            toast.error(response.data.message)
         }

         if(response.data.success){
            toast.success(response.data.message)

            setData({
                name:"",
                email:"",
                password:"",
                confirmPassword:""
            })

            navigate("/login")
         }

        console.log("response",response) 

        } catch (error) {
            console.log(error.response.data.message)

            AxiosToasrError(error)
            
        }

   

   
    
        
    
    
  }

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white w-full max-w-lg mx-auto rounded p-6 shadow-md mt-2'>
        <p className='text-center text-lg font-semibold mb-3'>Welcome to Binkeyit</p>
        <form className='mt-4 grid gap-4' onSubmit={handleSubmit}>

          {/* Name */}
          <div className='grid'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              className='bg-blue-100 p-2 rounded'
              name='name'
              placeholder='Enter your name'
              value={data.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className='grid'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              className='bg-blue-100 p-2 rounded'
              name='email'
              placeholder='Enter your email'
              value={data.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className='grid'>
            <label htmlFor='password'>Password:</label>
            <div className='flex items-center p-2 bg-blue-100 rounded'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className='bg-transparent p-2 w-full outline-none'
                name='password'
                placeholder='Enter password'
                value={data.password}
                onChange={handleChange}
              />
              <div
                onClick={() => setShowPassword(prev => !prev)}
                className='cursor-pointer text-gray-600'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className='grid'>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <div className='flex items-center p-2 bg-blue-100 rounded'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                className='bg-transparent p-2 w-full outline-none'
                name='confirmPassword'
                placeholder='Enter confirm password'
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <div
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className='cursor-pointer text-gray-600'
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            disabled={!validate}
            className={`py-2 mt-3 rounded text-white font-medium transition-all duration-300 
              ${validate
                ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            Register
          </button>
        </form>
        <p className='r'>
            Already have account?<Link to={"/login"} className='font-bold mt-1 text-blue-800 hover:text-blue-950'>Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
