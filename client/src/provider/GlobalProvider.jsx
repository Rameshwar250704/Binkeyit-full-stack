import { createContext,useContext, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import { useEffect } from "react";
import toast from "react-hot-toast";
import AxiosToasrError from "../utils/AxiosToastError";
import { handleAddAddress } from "../store/addressSlice";


export const GlobalContext=createContext(null)


export const useGlobalContext=()=>useContext(GlobalContext)

 const GlobalProvider=({children})=>{
  const dispatch=useDispatch()
  const [totalPrice,setTotalPrice]=useState(0)
  const [totalQty,setTotalQty]=useState(0)
  const [notDiscountTotalPrice,SetNotDiscountTotalPrice]=useState(0)
    const cartItem=useSelector(state=>state.cartItem.cart)
    const user=useSelector(state=>state?.user)
  
   const fetchCartItem=async()=>{
      try {
        const response=await Axios({
          ...SummaryApi.getCartItem
        })

        const responseData=response?.data
        if(responseData.success){
          dispatch(handleAddItemCart(responseData.data))
          console.log("responsedata",responseData.data)
        }
      } catch (error) {
        console.log(error)

        
      }
    }

        const getDiscountedPrice = (price, discount) => {
      return price - (price * discount) / 100
    }


    const updateCartItem=async(id,qty)=>{
      try {
        const response=await Axios({
          ...SummaryApi.updateCartItemQty,
          data:{
            _id:id,
            qty:qty

          }
        })

        const responseData=response.data
        if(responseData.success){
          toast.success(responseData.message)
          fetchCartItem()
        }
      } catch (error) {
        
      }
    }

    const deleteCartItem = async(cartId)=>{
      try {
          const response = await Axios({
            ...SummaryApi.deleteCartItem,
            data : {
              _id : cartId
            }
          })
          const { data : responseData} = response

          if(responseData.success){
            toast.success(responseData.message)
            fetchCartItem()
          }
      } catch (error) {
         AxiosToasrError(error)
      }
    }
        
  

    useEffect(()=>{
        const qty=cartItem.reduce((prev,curr)=>{
          return prev + curr.quantity
        },0)
        console.log(qty)
        setTotalQty(qty)
        
       const tPrice = cartItem.reduce((prev, curr) => {
  const discountedPrice =
    curr.productId.price -
    (curr.productId.price * curr.productId.discount) / 100

  return prev + discountedPrice * curr.quantity
}, 0)

        setTotalPrice(tPrice)

        const notDiscountPrice=cartItem.reduce((preve,curr)=>{
          return preve +(curr?.productId?.price*curr.quantity)
        },0)
        SetNotDiscountTotalPrice(notDiscountPrice)
    
        console.log(tPrice)
    
      },[cartItem])

      const fetchAddress = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getAddress })

      const responseData = response.data   // ✅ FIX

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data))
      }
    } catch (error) {
      console.log("error in fetch address", error)
    }
  }

      useEffect(()=>{
        fetchCartItem()
        fetchAddress()

      },[user])
    return(
        <GlobalContext.Provider value={{
          fetchCartItem,
          updateCartItem,
          fetchAddress,
          deleteCartItem,
          totalPrice,
          totalQty,
          notDiscountTotalPrice
        }}>
            {children}
        </GlobalContext.Provider>
    )

 }

export default GlobalProvider