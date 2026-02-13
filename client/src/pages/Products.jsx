import React from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToasrError from "../utils/AxiosToastError"
import Axios from "../utils/Axios"
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'

const Products = () => {
const[productData,setProductData]=useState([])
const [page,setPage]=useState(1)
const[loading,setLoading]=useState(false)
const [totalPageCount,setTotalPageCount]=useState(1)
const [searchValue,setSearchValue]=useState("")

const fetchProductData=async()=>{
  try {
    const response=await Axios({
      ...SummaryApi.getProduct,
      data:{
        page:1,
        limit:12,
        search:searchValue

      }
    })
    
    
    const product = response?.data
    
       if(product.success){
        console.log(product)
        setProductData(product.data)
       }
    
  } catch (error) {
    AxiosToasrError(error)
    
  }finally{
    setLoading(false)

  }
}
useEffect(()=>{
  fetchProductData()
},[page])

const handleNext =()=>{
  if(page!==totalPageCount-1){
    setPage(preve=>preve+1)
  }
 

}
const handlePrivious =()=>{
  if(page>1){
    setPage(preve=>preve-1)
  }
 

}
const handleOnChange=(e)=>{
  const {value}=e.target
  
  setSearchValue(value)
  setPage(1)
}

useEffect(()=>{
  let flag=true
  const interval=setTimeout(()=>{
    if (flag){
      fetchProductData()
   flag=false

    }
   
  },300);
  return ()=>{
    clearTimeout(interval)
  }
 

},[searchValue])

  return (
    <section>
     <div className='p-2 font-semibold shadow-md flex items-center justify-between'>

        <h2>Product</h2>
        <div className='h-full gap-4'>
          <input
          type="text"
          placeholder='search product'
          className='h-full px-4  bg-blue-50 outline-none py-3'
          value={searchValue}
          onChange={handleOnChange}
          />
        
      </div>
      
      
    </div>
    {
loading&&(
  <Loading/>
)
    }
   <div className='p-4 bg-blue-50'>
    <div className='min-h-[55vh]'>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 ">

      {
  productData.map((p,index)=>{
    return(
      <ProductCardAdmin data={p}/>
    )
  })
}
    </div>

    </div>
     
    <div className='flex justify-between my-4'>
      <button onClick={handlePrivious} className='border border-amber-300 px-4 py-1 hover:bg-yellow-400'>Previous</button>
      <button   className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
      <button onClick={handleNext} className='border border-amber-300 px-4 py-1 hover:bg-yellow-400'> Next</button>
    </div>
   </div>


    </section>
  )
}

export default Products
