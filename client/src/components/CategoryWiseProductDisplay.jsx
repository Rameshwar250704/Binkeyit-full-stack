import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi'


import AxiosToasrError from '../utils/AxiosToastError'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
// import {FaAngleLeft,FaAngleRight} from "react-icons/fa6"

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([])
  const [loading,setLoading]=useState(false)

  const fetchCategoryWiseProduct = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProducByCategory,
        params: { id }          // ✅ FIX
      })

      const responseData = response?.data?.data
      if(responseData.success){
        setData(responseData.data)

      }
      setData(responseData)
      console.log("category products", responseData)

    } catch (error) {
      console.log(error)
      AxiosToasrError(error)
    }finally{
        setLoading(false)

    }
  }

  useEffect(() => {
    if (id) fetchCategoryWiseProduct()
  }, [id])

  const loadingCardNumber=new Array(6).fill(null)

  return (
    <div className=''>
      <div className="container mx-10 p-6 flex items-center justify-between">
        <h3 className="font-semibold  md:text-2xl">{name}</h3>

        {/* <Link to="#" className="text-green-600">see all</Link> */}
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-6">

        { loading &&
            loadingCardNumber.map((_,index)=>{
                return (
                    <CardLoading key={"categoryWiseProductDisplay123"+index} />

                )
            })
        }
        {

            data.map((P,index)=>{
                return (
                    <CardProduct data={P} key={P._id+"categoryWiseProductDisplay"+index}/>
                )
            })
        }
        {/* <div className='w-full left-0 right-0 container mx-auto  absolute flex justify-between items-center-safe'>
          <button className='z-10 relative bg-white hover:bg-gray-10 shadow-lg text-lg p-2 rounded-full'>
            <FaAngleLeft/>
          </button>
          <button>
            <FaAngleRight/>
          </button>
        </div> */}
        
      </div>
    </div>
  )
}

export default CategoryWiseProductDisplay