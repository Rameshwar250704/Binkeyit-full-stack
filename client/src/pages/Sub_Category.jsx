import React,{useEffect, useState} from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToasrError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { setAllSubCategory } from "../store/productSlice";



const Sub_Category = () => {
  const [openAddSubCategory,setopenAddSubCategory]=useState(false)
  const dispatch=useDispatch()
 const [data,setData]=useState([])
 const[loading,setLoading]=useState(false)
  const fetchSubCategory=async()=>{
    try {
      setLoading(true)
      const response=await Axios({
        ...SummaryApi.getSubCategory
      })
      
      const subCategory = response?.data
       if(subCategory.success){
        setData(subCategory.data)
        dispatch(setAllSubCategory(subCategory.data))
       }

      
    } catch (error) {
      
      console.log("error ahe me ")
      
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchSubCategory()
    
    

  },[])
  console.log("subCategoryData",data)
  return (
      <section>
    <div className='p-2 font-semibold shadow-md flex items-center justify-between'>
      <h2> Sub_Category</h2>
      <button onClick={()=>setopenAddSubCategory(true)}  className='text-sm border rounded px-3 py-1 bg-amber-200'>Add SUB_Category </button>

      
    </div>
    <div>
<div className="p-4">
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-3 py-2 text-left">#</th>
          <th className="border px-3 py-2 text-left">Sub Category Name</th>
          <th className="border px-3 py-2 text-left">Image</th>
          <th className="border px-3 py-2 text-left">Categories</th>
          <th className="border px-3 py-2 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && !loading && (
          <tr>
            <td colSpan="5" className="text-center py-4 text-gray-500">
              No Sub Categories Found
            </td>
          </tr>
        )}

        {data.map((item, index) => (
          <tr key={item._id} className="hover:bg-gray-50">
            {/* 1️⃣ Serial No */}
            <td className="border px-3 py-2">
              {index + 1}
            </td>

            {/* 2️⃣ Name */}
            <td className="border px-3 py-2 font-medium">
              {item.name}
            </td>

            {/* 3️⃣ Image */}
            <td className="border px-3 py-2">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-contain border rounded"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </td>

            {/* 4️⃣ Categories */}
            <td className="border px-3 py-2">
              <div className="flex flex-wrap gap-1">
                {item.category?.map((c) => (
                  <span
                    key={c._id}
                    className="text-xs bg-white text-yellow-800 px-2 py-0.5 rounded"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </td>

            {/* 5️⃣ Actions */}
            <td className="border px-3 py-2 text-center">
              <div className="flex justify-center gap-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <MdEdit size={20} />
                </button>

                <button
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {loading && (
    <p className="text-center mt-4 text-gray-500">
      Loading sub categories...
    </p>
  )}
</div>


    </div>
    {
      openAddSubCategory &&(
        <UploadSubCategoryModel
        close={()=>setopenAddSubCategory(false)}
        fetchData={fetchSubCategory}
        />
        
      )
    }
    </section>
  )
}

export default Sub_Category
