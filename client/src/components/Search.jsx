import React, { useEffect,useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import { useLocation, useNavigate } from 'react-router-dom';


const Search = () => {

const navigate=useNavigate()
const location=useLocation()
const [isSearchPage,setIsSearchPage]=useState(false)
const params=useLocation()
const searchText =params.search.slice(3)


useEffect(()=>{
  const isSearch=location.pathname==="/search"
  setIsSearchPage(isSearch)
},[location])


const redirectToSearchPage=()=>{
  navigate("/search")

}

const handleOnChange=(e)=>{
  const value=e.target.value
  const url=`/search?q=${value}`
  navigate(url)
}


  return (

    <div className='w-full bg-gray-100 min-w-[300px] h-11 lg:h-12 rounded-3xl border flex items-center text-neutral-500  focus-within:border-yellow-400 '>
      <button className='flex justify-center items-center h-full p-3 text-neutral-800 '>
        <IoSearchSharp size={22} />
      </button>
      <div className='w-full h-full'>
        {
          !isSearchPage?(
            //not in search page
            <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
         <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'Search "Milk"',
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          'Search "Bread"',
          1000,
          'Search "Panner"',
          1000,
          'Search "joy"',
          1000
        ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
      </div>
          ):(// wheni was search page 
            <div className='w-full h-full'>
              <input
              type="text"
              placeholder='search what you want'
              autoFocus
              defaultValue={searchText}
              className='h-full w-full outline-none'
              onChange={handleOnChange}
              />
              </div>
            )
        }

      </div>
      
      </div>
  )
}

export default Search
