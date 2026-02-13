import React from 'react'

const CardLoading = () => {
  return (
    <div className=" mx-10 flex gap-4 overflow-x-hidden px-4">

     
        <div
          
          className="min-w-[180px] bg-white rounded-lg shadow p-3 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-full h-32 bg-gray-300 rounded"></div>

          {/* Title skeleton */}
          <div className="h-4 bg-gray-300 rounded mt-3"></div>

          {/* Price skeleton */}
          <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>
        </div>
      

    </div>
  )
}

export default CardLoading

// import React from 'react'

// const CardLoading = () => {
//   return (
//     <div className='border p-2'>
//         <div>

//         </div>
// cardloading
//     </div>
//   )
// }

// export default CardLoading
