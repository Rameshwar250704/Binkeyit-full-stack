import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/No Data'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { useSelector } from 'react-redux'

const Category = () => {
    const[openUploadCategory,setopenUploadCategory]=useState(false)
    const [loading,setLoading]=useState(false)
    const [categoryData,setcategoryData]=useState([])

    // const allCategory=useSelector(state=>state.product.allCategory)

    // useEffect(()=>{
    //   setcategoryData(allCategory)

    // },[allCategory])
    
    const fetchCategory=async()=>{
      try {
        setLoading(true)
        const response=await Axios({
          ...SummaryApi.getCategory
        })

       const categoryList = response?.data
       if(categoryList.success){
        setcategoryData(categoryList.data)
       }

       
      

        
      } catch (error) {
        
      } finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
      fetchCategory()

    },[])
  return (
    <section>
    <div className='p-2 font-semibold shadow-md flex items-center justify-between'>
      <h2>Category</h2>
      <button onClick={()=>setopenUploadCategory(true)}  className='text-sm border rounded px-3 py-1 bg-amber-200'>Add Category </button>

      
    </div>
    {
      !categoryData[0] && !loading && (
        <NoData/>
      )
    }

   <div className="
  p-3 
  sm:p-4 
  grid 
  grid-cols-2 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4 
  gap-4 
  sm:gap-6
">
  {categoryData.map((category, index) => (
    <div
      key={index}
      className="
        bg-sky-50
        hover:bg-sky-100
        rounded-xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        p-3
        flex
        flex-col
        items-center
        active:scale-95
        group
      "
    >
      {/* Image */}
      <div className="
        w-full 
        h-24 
        sm:h-28 
        md:h-32 
        flex 
        items-center 
        justify-center 
        overflow-hidden 
        rounded-lg
      ">
        <img
          src={category.image}
          alt={category.name}
          className="h-full object-contain"
        />
        <div className='justify-center font-semibold items-right flex-col p-4 w-20  hidden group-hover:flex'>
          <button className='flex-1 mt-1.5 h-9 hover:bg-blue-950 text-white gap-1.5 bg-blue-400' >edit</button>
          <button className='flex-2 mt-2.5 hover:bg-red-700 text-white bg-yellow-200'>delete</button>
        </div>

      </div>

      {/* Name */}
      <p className="
        mt-2 
        sm:mt-3 
        text-xs 
        sm:text-sm 
        font-semibold 
        text-gray-700 
        text-center
      ">
        {category.name}
      </p>
    </div>
  ))}
</div>




    {
      loading&&(
        <Loading/>
      )
    }
    {
        openUploadCategory&&(
            <UploadCategoryModel fetchData={fetchCategory} close={()=>setopenUploadCategory(false)}/>
        )
    }

    
    </section>
  )
}

export default Category
