import React from 'react';

const categories = ["Chairs", "Tables", "Sofas", "Armchairs", "Beds", "Storage", "Textiles", "Lighting", "Toys", "Decor"];

function BottomHeader() {
  return (
    <section className='lg:hidden w-full flex justify-between items-center pb-2 pt-2'>
      <ul className='flex gap-1'>
        {categories.map(category=>(
          <li key={category} className='transition-all duration-75 ease-in hover:text-orange-600' >
            {category}
          </li>
        ))}
      </ul>
      <div className='p-1 border-0 rounded-md bg-blue-300 bg-opacity-45'>Free shipping for all orders of $1.300</div>
    </section>
  )
}

export default BottomHeader;