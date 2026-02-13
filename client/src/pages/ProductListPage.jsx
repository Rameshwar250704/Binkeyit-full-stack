import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from "../utils/Axios"
import { useEffect } from 'react'
import Loading from "../components/Loading"
import CardProdut from "../components/CardProduct"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProductListPage = () => {
  const [data,setData]=useState([])
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)
  const [totalPage,setTotalPage]=useState(1)
  const params=useParams()
 const [DisplaySubCategory,setDisplaySubCategory]=useState([])


  const AllSubCategory=useSelector(state=>state.product.allSubCategory)

  const subCategory=params.subCategory.split("-")
  const subCategoryName=subCategory?.slice(0,subCategory?.length-1).join(" ")
  
  const categoryId=params.category.split("-").slice(-1)[0]
   const subCategoryId=params.subCategory.split("-").slice(-1)[0]

 

  const fetchProductdata=async()=>{
    
    
 
    try {
      setLoading(true)
      const response=await Axios({
        ...SummaryApi.getProductByCategorySubCategory,
        data:{
          categoryId:categoryId,
          subCategoryId:subCategoryId,
          page:page,
          limit:10

        }
      })

      const responseData=response.data

      if(responseData.success){
        if(responseData.page==1){
          setData(responseData.data)
        }else{
         setData(prev => [...prev, ...responseData.data])

        }
       setTotalPage(
  Math.ceil(responseData.totalCount / responseData.limit)
)


        console.log(responseData)
      }
      
    } catch (error) {
      console.log("some thing not appen ")

      
    }finally{
      setLoading(false)
    }

  }
  
   console.log(params)

   useEffect(()=>{
    fetchProductdata()
   },[params,page])

   useEffect(()=>{
    const sub=AllSubCategory.filter(s=>{
      const filterData=s.category.some(el=>{
        return  el._id == categoryId
      })
      return filterData ? filterData: false
    })

    setDisplaySubCategory(sub)
    console.log("sub",sub)
   },[params,AllSubCategory])

   
  return (
    
     <section className='sticky top-24 lg:top-20'>
      
<div className="
sticky
  container mx-auto 
  grid 
  grid-cols-[90px_1fr] 
  md:grid-cols-[200px_1fr] 
  lg:grid-cols-[280px_1fr]
">

        <div className='bg-gray-500 overflow-y-scroll  min-h-[80vh] p-2 grid gap-1'>
        {/* sub category */}
        {/* {
          DisplaySubCategory.map((s,index)=>{
            return (
              <div className={`w-full p-2 bg-white
               ${subCategoryId==s._id ? "bg-green-500" : ""}

               `}>
                <div className='w-full'>
                <img
                src={s.image}
                alt="subcategory"
                className='w-14 h-full object-scale-down'
                
                />
                </div>
                <p className='-mt text-xs '>{s.name}</p>
                </div>
            )
          })
        } */}
        {
  DisplaySubCategory.map((s,index)=>{
    return (
      <Link
        key={s._id}
        to={`/${params.category}/${s.name.replaceAll(" ","-")}-${s._id}`}
        className={`w-full p-2 block bg-white cursor-pointer
          ${subCategoryId === s._id ? "bg-green-500" : ""}
        `}
      >
        <div className='w-full flex justify-center'>
          <img
            src={s.image}
            alt="subcategory"
            className='w-40 h-40 object-contain'
          />
        </div>
        <p className='font-bold  text-center mt-5'>{s.name}</p>
      </Link>
    )
  })
}

        sub
      </div>
      <div className='bg-green-200'>
        {/* product */}
        <div className='bg-white  rounded shadow-md p-3'>
          <h3 className='font-semibold'>{subCategoryName}</h3>
        </div>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 p-4 gap-3 '>
            {
              data.map((p,index)=>{
                return(
                  <CardProdut
                  data={p}
                  key={p._id+"productSubCategory"+index}
                  
                  />
                )

              })
            }
          </div>
          {
            loading&&(
              <Loading/>
            )
          }
        </div>
        
      </div>
      </div>

     </section>
    
    
  )
}

export default ProductListPage
