import React from 'react'

const ProductCardAdmin = ({data}) => {
  return (
    <div className='w-32 p-2 bg-amber-50 rounded'>
        <div >
            <img
            src={data?.image[0]}
            alt={data.name}
            className='w-full h-full object-scale-down'
            />
        </div>
        <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text font-medium'>{data?.unit}</p>

      
    </div>
  )
}

export default ProductCardAdmin
