import React from 'react'
import ProductsCarousel from './ProductsCarousel';
import AnimatedDot from './AnimatedDot';

const dots = [
  {top:"43%", left:"33%", productId:"101"},
  {top:"70%", left:"19%", productId:"102"},
  {top:"90%", left:"85%", productId:"103"}
]

function WeeklyCollection() {
  return (
    <div className='my-16 flex flex-col md:flex-row gap-6 items-center'>
      <div className='md:w-1/2 lg:basis-2/3 flex flex-col items-center gap-4'>
        <div className='self-center md:self-start'>
          <h2 className='text-2xl text-gray-900'>Furniture collection of the week</h2>
          <p className='text-gray-500'>The most popular products from the collection</p>
        </div>
        <ProductsCarousel/>
      </div>
      <div className='md:w-1/2 lg:basis-1/3 relative w-full rounded-lg overflow-hidden'>
        <img loading='lazy' src="/images/poster-weekly-collection.webp" alt="poster-weekly-collection" className='w-full h-full'/>
        <AnimatedDot dots={dots}/>
      </div>
      
    </div>
  )
}

export default WeeklyCollection;