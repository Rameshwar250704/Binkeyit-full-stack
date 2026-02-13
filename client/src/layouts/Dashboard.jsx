import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'


const Dashboard = () => {
  return (
    <section className='bg-white absolute top-23 w-full  left-4  '>
    <div className='container mx-auto p-3 grid grid-cols-[320px_1fr] w-full  '>
      
        {/**left for  menu */ }
        <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r'>
          <UserMenu/>
        </div>

      
      {/** right for menu container  */} 
      <div className='bg-white min-h-[75vh]'>
      <Outlet/>
      </div>
      
    </div>
    </section>
  )
}

export default Dashboard
