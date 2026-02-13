import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToasrError from '../utils/AxiosToastError'
import Loading from"../components/Loading"
import { useSelector } from 'react-redux'
import {FaMinus,FaPlus} from 'react-icons/fa6'

const AddToCartButton = ({data}) => {

    const {fetchCartItem,updateCartItem,deleteCartItem}=useGlobalContext()
    const [loading,setLoading]=useState(false)
    const cartItem=useSelector(state=>state.cartItem.cart)

    const [isAvailableCart,setIsAvailableCart]=useState(false)
    const [qty,setQty]=useState(0)
    const [cartItemDetails,setCartItemDetails]=useState()
    console.log("addtocartbutton",cartItem)

  const handleAddTocart = async (e) => {
  e.preventDefault()
  e.stopPropagation()

  try {
    setLoading(true)

    const response = await Axios({
      ...SummaryApi.addTocart,
      data: {
        productId: data?._id
      }
    })

    const responseData = response.data

    if (responseData.success) {
      toast.success(responseData.message)
      if (fetchCartItem) {
        fetchCartItem()
      }
    }

  } catch (error) {
    AxiosToasrError(error)
  } finally {
    setLoading(false)
  }
}
  //cjecking item in cart or not
  useEffect(()=>{
     const checkingitem=cartItem.some(item=>item.productId._id===data._id)
     setIsAvailableCart(checkingitem)
     const  product=cartItem.find(item=>item.productId._id===data._id)
     setQty(product?.quantity)
     setCartItemDetails(product)

  },[data,cartItem])

  const increaseQty=(e)=>{
    e.preventDefault()
    e.stopPropagation()
      
    updateCartItem(cartItemDetails?._id,qty+1)

  }
  const decreaseQty=(e)=>{
      e.preventDefault()
    e.stopPropagation()
    if(qty===1){
        deleteCartItem(cartItemDetails?._id)
    }
    
    updateCartItem(cartItemDetails?._id,qty-1)

  }
  return (
    <div className='w-full max-w-[150px]'>
        {
           isAvailableCart ? (
  <div className="flex items-center gap-2">
    
    <button
      onClick={decreaseQty}
      className="w-7 h-7 flex items-center justify-center
                 bg-gray-200 rounded
                 hover:bg-gray-300
                 active:bg-gray-400
                 focus:outline-none"
    >
      <FaMinus size={12} />
    </button>

    <p className="w-6 text-center font-medium select-none">
      {qty}
    </p>

    <button
      onClick={increaseQty}
      className="w-7 h-7 flex items-center justify-center
                 bg-gray-200 rounded
                 hover:bg-gray-300
                 active:bg-gray-400
                 focus:outline-none"
    >
      <FaPlus size={12} />
    </button>

  </div>
) 
:(
                 <div  onClick={handleAddTocart} className="inline-flex items-center justify-center px-5 py-2 
                bg-green-600 text-white font-medium rounded-lg 
                cursor-pointer select-none
                hover:bg-green-700 transition-all duration-200
                active:scale-95 shadow-md">
                {loading?<Loading/>:"Add"}
        </div>

            )
        }
        
             
      
    </div>
  )
}

export default AddToCartButton
