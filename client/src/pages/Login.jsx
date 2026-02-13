import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToasrError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = Object.values(data).every(el => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('accesstoken', response.data.data.accesstoken);
        localStorage.setItem('refreshtoken', response.data.data.refreshtoken);

        const userDetails=await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))
         navigate("/", { replace: true });
         window.location.reload(); 
        

        setData({
          email: "",
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      AxiosToasrError(error);
    }
  };

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white w-full max-w-lg mx-auto rounded p-6 shadow-md mt-2'>
        <p className='text-center text-lg font-semibold mb-3'></p>

        <form className='mt-4 grid gap-4' onSubmit={handleSubmit}>
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

          {/* Login Button */}
          <button
            disabled={!validate}
            className={`py-2 mt-3 rounded text-white font-medium transition-all duration-300 
              ${validate
                ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            Login
          </button>
        </form>

        <p className='mt-3 text-center'>
          Don’t have an account?{" "}
          <Link to={"/register"} className='font-bold text-blue-800 hover:text-blue-950'>
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
  