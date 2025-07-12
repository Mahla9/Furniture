import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {icon:"/icons-bottom-header/1-chairs.svg" , text: "Chairs"},
  {icon: "/icons-bottom-header/2-tables.svg", text:"Tables" },
  {icon:"/icons-bottom-header/3-sofas.svg" , text: "Sofas"},
  {icon:"/icons-bottom-header/4-armchairs.svg" , text: "Armchairs"},
  {icon: "/icons-bottom-header/5-beds.svg", text: "Beds"},
  {icon: "/icons-bottom-header/6-storage.svg", text: "Storage"},
  {icon: "/icons-bottom-header/7-textiles.svg", text: "Textiles"},
  {icon: "/icons-bottom-header/8-lighting.svg" , text: "Lighting"},
  {icon: "/icons-bottom-header/9-toys.svg", text: "Toys"},
  {icon: "/icons-bottom-header/10-decor.svg", text: "Decor"},
];

function BottomHeader() {
  return (
    <section className='hidden lg:flex w-full justify-between items-center pb-2 pt-2'>
      <ul className='flex gap-8 '>
        {categories.map(category=>(
          <Link to={`/products/${category.text}`} key={category.text} className='cursor-pointer transition-all duration-150 ease-in hover:text-orange-400 text-xs flex text-gray-700 font-semibold' >
            <img src={category.icon} alt={category.text} className='w-5 h-5'/>
            <span className='ml-1'>{category.text}</span>
          </Link>
        ))}
      </ul>
      <div className='py-1 px-2 ml-4 rounded-xl bg-blue-200 bg-opacity-45 transition-all ease-in duration-150 hover:bg-opacity-60 text-xs'>Free shipping for all orders of $1.300</div>
    </section>
  )
}

export default BottomHeader;