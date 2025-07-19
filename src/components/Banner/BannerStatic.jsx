import React from 'react'
import { Link } from 'react-router-dom'

function BannerStatic() {
  return (
    <div className='relative'>
      <img src="/images/banner.webp" alt="banner" className='w-full h-full object-cover'/>
      <div className='absolute left-16 top-1/2 -translate-y-1/2'>
        <h2 className='text-xl md:text-2xl lg:text-3xl xl:text-5xl text-white font-semibold'>My account</h2>

        {/* این تیکه اش باید از انت دیزاین استفاده کنم
        مسیر راهنما : breadcrump , Menu 
        */}
        <div className='text-white font-semibold mt-6'>
            <Link to='/' className='font-normal text-gray-600 transition-all duration-200 ease-linear cursor-pointer hover:text-white'>
            Home /</Link> 
        </div>
      </div>
    </div>
  )
}

export default BannerStatic
