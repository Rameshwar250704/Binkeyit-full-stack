

import React from 'react'
import banner from '../assets/banner.jpg'
import bannermobile from "../assets/bannermobile.jpg"
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const setsubcategoryData = useSelector(state => state.product.allSubCategory)
  const hasData = Array.isArray(categoryData) && categoryData.length > 0
const navigate=useNavigate()

  const handleRedirectProductListpage=(id,cat)=>{
    console.log(id,cat)
 const subcategory= setsubcategoryData.find(sub=>{
  const filterData=sub.category.some(c=>{
    return c._id==id
  })
  return filterData?true:null
 })

 const url=`/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
  navigate(url)
 console.log(url)
  }

  return (
    <section className="pt-3 bg-blue-50 min-h-screen">

      {/* ===== Banner ===== */}
      <div className="px-3 md:px-4 lg:px-10">
        <div className="w-full h-44 md:h-52 bg-white rounded-xl overflow-hidden">
          <img
            src={banner}
            alt="banner"
            className="hidden lg:block w-full h-full object-cover"
          />
          <img
            src={bannermobile}
            alt="bannermobile"
            className="block lg:hidden w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ===== Categories ===== */}
      <div className="px-3 md:px-4 lg:px-10 mt-5">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">

          {/* Loading */}
          {!hasData && loadingCategory && (
            <p className="col-span-full text-center font-semibold">
              Loading…
            </p>
          )}

          {/* Category Cards */}
          {hasData && categoryData.map(cat => (
            <div
              key={cat._id}
              className="flex flex-col items-center gap-2"
            >
              {/* Blue background ONLY for image */}
              <div className="bg-blue-100 rounded-xl p-3 flex items-center justify-center" onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Name OUTSIDE blue bg */}
              <p className="text-sm text-center font-medium leading-tight">
                {cat.name}
              </p>
            </div>
          ))}

        </div>
      </div>
{/* 
      display all product from thwe category */}
      {
        categoryData.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay id={c?._id} name={c?.name}/>
          )
        })
      }
      

    </section>
  )
}

export default Home
