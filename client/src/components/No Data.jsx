import React from 'react'
import nothingishear from '../assets/nothing is hear.png'

const NoData = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-2.5'>
        <img
        src={nothingishear}
        
        className="w-50 p-4 "
        />
        <p>NO Category</p>
      
    </div>
  )
}

export default NoData
