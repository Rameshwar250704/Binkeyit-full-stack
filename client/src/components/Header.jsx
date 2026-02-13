import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link,useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import { useEffect } from 'react';
import { current } from '@reduxjs/toolkit';

import DisplayCartItem from './DisplayCartItem';
import { useGlobalContext } from '../provider/GlobalProvider';





const Header = () => {
  const navigate=useNavigate()
  const user=useSelector((state)=>state?.user)
  const [openUserMenu,setopenUserMenu]=useState(false)
// const [totalPrice,setTotalPrice]=useState(0)
// const [totalQty,setTotalQty]=useState(0)
const {totalPrice,totalQty}=useGlobalContext()

const [openCartSection,setOpenCartSection]=useState(false)

  const cartItem=useSelector(state=>state.cartItem.cart)
  console.log("cartitem",cartItem)
  const handleMobile=()=>{
    if(!user._id){
      navigate("/login")
      return

    }
    navigate("/user")
  }

  

  const redirectToLoginPage=()=>{

  navigate("/login")

  //total items and total price

  
}
// useEffect(()=>{
//     const qty=cartItem.reduce((prev,curr)=>{
//       return prev + curr.quantity
//     },0)
//     console.log(qty)
//     setTotalQty(qty)
    
//     const tPrice=cartItem.reduce((preve,curr)=>{
//       return preve + curr.productId.price * curr.quantity
//     },0)
//     setTotalPrice(tPrice)

//     console.log(tPrice)

//   },[cartItem])
  return (  
    <header className="h-auto lg:h-20 lg:shadow-md sticky top-0 z-40 bg-white flex flex-col justify-center">
      {/* Main Header Row */}
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              width={150}
              height={60}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={100}
              height={50}
              alt="logo"
              className="lg:hidden"
            />
          </Link>
        </div>

        {/* Search (Desktop only) */}
        <div className="hidden lg:block w-[350px]">
          <Search />
        </div>

        {/* User / Cart Section */}
        <div>
         <div className="flex items-center gap-4" onClick={handleMobile}>
          <button className="text-neutral-600 lg:hidden">
            <FaUser size={25} />
          </button>

          </div>
        <div>
          <div className="hidden lg:flex items-center gap-6 text-neutral-700 font-medium ">

            {
              user?._id?(
                <div className='relative'>
                  <div onClick={()=>setopenUserMenu(preve=>!preve)} className='flex items-center gap-2 cursor-pointer'>
                  <p>Acoount</p>
                  {
                    openUserMenu? (
                      <GoTriangleUp size={25}/>

                    ):(
                      <GoTriangleDown size={25}/>

                    )
                  }

            
                    </div>
                    {
                      openUserMenu &&(
                          <div className='absolute right-0.5 top-13'>
                          <div className='bg-white rounded p-1 min-w-52 lg:shadow-lg'>
                            <UserMenu/>
                          
                          </div>
                    </div>

                      )

                  

                    }
                   

                  
                </div>
              ):(
              
                
            
            
            
             <button onClick={redirectToLoginPage} className="cursor-pointer bg-yellow-400 px-4 py-2 rounded-md text-white hover:bg-yellow-500 transition">
             Login
               </button>
                 )
              }

            <button  onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-500 px-2 py-1 text-white shadow rounded-e-2xl hover:bg-green-900 '>
              {/* {add to cart icon} */}
              <div>
                <FaCartShopping size={22}/>


              </div>
              {/* {items added shows} */}
              <div className='font-semibold'>
                {
                  cartItem[0]?(
                    <div>

                      <p>{totalQty} Items</p>
                      <p className="price">
  ₹{new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(totalPrice)}
</p>

                      
                      </div>
                  ):(
                     <p>my cart</p>

                  )
                }
                
              
              
              </div>
            </button>
            
           
          </div>
        </div>
        </div>
      </div>

      {/* Search (Mobile only) */}
      <div className="block lg:hidden container mx-auto px-4 pb-3">
        <Search />
      </div>

     {
      openCartSection && (
        <DisplayCartItem close={()=>setOpenCartSection(false)}/>
      )
     }
    </header>
  );
};


export default Header;



