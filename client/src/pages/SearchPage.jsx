import React, { useEffect, useState } from 'react'
import CardLoading from "../components/CardLoading"
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi'
import CardProduct from "../components/CardProduct"
import infiniteScroll from "react-infinite-scroll-component"
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noData from '../assets/nothing is hear.png'

const SearchPage = () => {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)
  const loadingArrayCard=new Array(12).fill(null)
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const params=useLocation()
  const searchText=params?.search?.slice(3)

  const fetchData=async()=>{
    try {
      setLoading(true)
      const response=await Axios({
        ...SummaryApi.searchProduct,
        data:{
          search:searchText,
          page:page
        }
      })

      const responseData=response?.data
      console.log("responseData",responseData)

      if(responseData.success){
        if(responseData.page==1){
          setData(responseData.data)
        }else{
          setData((preve)=>{
            return[
              ...preve,
              ...responseData.data
            ]
          })
        }
        setTotalPage(responseData.totalPage)
        
      }
    } catch (error) {
      console.log("chat gpt can solve error",error)
      
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[page,searchText])

  const handleFetchMore=()=>{
    if(totalPage >page){
      setPage(preve=>preve+1)
    }
  }
  console.log("page",page)
  return (
    // <section>
    //   <div className=' p-1'>
    //   <p className='font-semibold'>search result:{data.length} </p>
      
    //   <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 '>
    //     <InfiniteScroll
    //     dataLength={data.length}
    //     hasMore={true}
    //     next={handleFetchMore}
    //     ></InfiniteScroll>
    //   {
    //     data.map((p,index)=>{
    //       return(
    //         <CardProduct data={p} key={p?._id+"searchProduct"+index}/>
    //       )
    //     })
    //   }
    //   {
    //     !data[0]&&!loading&&(
    //       <div className='flex justify-center items-center '>
    //         <img
    //         src={noData}
    //         className='bg-red-500 w-full h-full max-w-sm max-h-sm'/>

    //         </div>
    //     )
    //   }

    //   {
    //     loading&&(
    //       loadingArrayCard.map((_,index)=>{
    //         return(
    //           <CardLoading key={"loadingsearchpage"+index}/>
    //         )
    //       })
    //     )
    //   }
    //   </div>
    // </div>
    // </section>
    <section>
  <div className="p-1">
    <p className="font-semibold">
      search result: {data.length}
    </p>

    <InfiniteScroll
      dataLength={data.length}
      next={handleFetchMore}
      hasMore={page < totalPage}
      loader={
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {loadingArrayCard.map((_, index) => (
            <CardLoading key={"loading" + index} />
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {data.map((p, index) => (
          <CardProduct
            data={p}
            key={p?._id + "searchProduct" + index}
          />
        ))}
      </div>
    </InfiniteScroll>

    {/* No data */}
    {!data.length && !loading && (
      <div className="flex justify-center items-center mt-10">
        <img
          src={noData}
          className="max-w-sm max-h-sm"
        />
      </div>
    )}
  </div>
</section>

  )
}

export default SearchPage
