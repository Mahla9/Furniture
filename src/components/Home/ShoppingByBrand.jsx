import React from 'react';

const brands = [
    {id:1, brand:"Elitis", image:"/images/brands/elitis.jpeg", logo:"/images/brands/elitis-logo.png", country: "Talosa / France"},
    {id:2, brand:"Hay", image:"/images/brands/hay.jpeg", logo:"/images/brands/hay-logo.png", country: "Barcelona / Spain"},
    {id:3, brand:"Kettal", image:"/images/brands/kettal.jpeg", logo:"/images/brands/kettal-logo.png", country: "Barcelona / Spain"},
    {id:4, brand:"Llardo", image:"/images/brands/llardo.jpeg", logo:"/images/brands/llardo-logo.png", country: "Valencia / Spain"},
    {id:5, brand:"Poliform", image:"/images/brands/poliform.jpeg", logo:"/images/brands/poliform-logo.png", country: "Como / Italy"}
]

function ShoppingByBrand() {
  return (
    <div className='mt-5 flex flex-col gap-5'>
        {/* header title */}
        <div className='mb-4'>
            <h2 className='text-gray-800 text-3xl'>Shopping by brands</h2>
            <p className='text-gray-500'>Discover lots products from popular brands</p>
        </div>

        {/* content */}
        <div className='w-full h-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 place-items-center'>
        {brands.slice(0,4).map(brand=>(
        <div key={brand.id} className='relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ease-in group'>
            <div className='w-full h-full custom-shadow'>
                <img src={brand.image} alt={brand.brand} />
            </div>
            <div className='flex gap-3 absolute top-4 left-4'>
                <img src={brand.logo} alt={brand.brand} />
                <div>
                    <h3 className='font-semibold text-white text-xl'>{brand.brand}</h3>
                    <span className='text-gray-200 text-sm font-mono '>{brand.country}</span>
                </div>
            </div>
        </div>
        ))}
        <div className='hidden xl:block relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ease-in group'>
                <div className='w-full h-full custom-shadow'>
                    <img src={brands[4].image} alt={brands[4].brand} />
                </div>
                <div className='flex gap-3 absolute top-4 left-4'>
                    <img src={brands[4].logo} alt={brands[4].brand} />
                    <div>
                        <h3 className='font-bold text-white text-xl'>{brands[4].brand}</h3>
                        <span className='text-sm text-gray-300 font-mono'>{brands[4].country}</span>
                    </div>
                </div>
        </div>
    </div>
    </div>

  )
}

export default ShoppingByBrand
