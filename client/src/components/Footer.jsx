import React from 'react'
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t bg-white'>
        <div className='container mx-auto p-4 text-center flex flex-col gap-3'>
        <p>All right reserve 2025</p>
        <div className='flex item-center gap-4 justify-center text-2xl'>
            <a href=''>
                <FaFacebook />
            </a>
            <a href=''>
                <FaFacebook />
            </a>
            <a href=''>
                <FaFacebook />
            </a>
        </div>
        </div>
    </footer>
  )
}

export default Footer
