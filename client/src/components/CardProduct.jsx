import React from 'react'

import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
 import SummaryApi from '../common/SummaryApi'
import { useState } from 'react'
import Axios from "../utils/Axios"
import AxiosToasrError from "../utils/AxiosToastError"
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({ data }) => {
  const url=`/product/${valideURLConvert(data.name)}-${data._id}`
  const [loading,setLoading]=useState(false)
  
  return (
    <Link to={url} className=" mx-10 min-w-[180px] bg-white rounded-lg shadow p-3">
      
      {/* Image */}
      <div className="w-full h-32 rounded overflow-hidden ">
        <img
          src={data?.image?.[0]}
          alt={data?.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title */}
      <p className="text-sm font-medium mt-3 line-clamp-2">
        {data?.name || "Product name"}
      </p>

      {/* Price */}
      <p className="text-green-600 font-semibold mt-5 flex justify-between">
        ₹{data?.price - data?.discount*data.price/100}
        <div>
          {
            data.stock==0?(
              <p className='text-red-500 text-sm text-center'>Out of stock</p>
            ):(
              <AddToCartButton data={data}/>

            )
          }
          
        </div>
      </p>

    </Link>
  )
}

export default CardProduct
