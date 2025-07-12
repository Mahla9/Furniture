import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const menu_items = [{name: "Home", link: '/'}, {name: "About Us", link: ''}, {name: "Demos", link: ''}, {name: "Blog", link: ''}, {name:"Contact Us", link: ''}, {name:"Gift Cards", link: ''}, {name:"Showroom", link: ''} ];
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

function Sidebar({showSidebar, setShowSidebar}) {
  const [selected, setSelected] = useState("categories");

  const handleSelected = (e) => {
      if(e.target.id === "categories") setSelected("categories");
      else setSelected("menu");
  }

  return (
    <>
    {/* overlay */}
    {showSidebar && <div className='fixed inset-0 z-50 bg-black bg-opacity-70 w-full h-full' onClick={()=>setShowSidebar(false)}></div>}

    {/* sidebar */}
    <div className={`fixed inset-y-0 left-0  bg-white w-64 z-50 transition-transform ease-linear duration-200 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`} >
      
      {/* search */}
      <form className='relative w-full py-5 px-1 shadow-md shadow-gray-300'>
        <input className='w-full focus:outline-none placeholder:text-gray-600 placeholder:text-sm font-semibold pl-4' type="text" placeholder='search for products'/>

        <button type='submit' className='bg-transparent border-none absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </form>

      {/* select option */}
      <div className='flex items-center justify-center mb-5 w-full '>
        <div className={`relative group py-3 w-full text-center text-sm ${selected==="categories" ? "text-gray-600 bg-gray-300" : "text-gray-400 bg-gray-100"} font-semibold`}>
          <input type="radio" name='side-menu' hidden id='categories' onChange={handleSelected}/>
          <label htmlFor="categories" >CATEGORIES</label>
          {/* border-bottom */}
          <span className={`group h-0.5 w-full bg-orange-600 bg-opacity-0 absolute bottom-0 inset-x-0 `}></span>
        </div>
        <div className={`relative group py-3 w-full text-center text-sm ${selected==="menu" ? "text-gray-600 bg-gray-300" : "text-gray-400 bg-gray-100"} font-semibold`}>
          <input type="radio" name='side-menu' hidden id='menu' onChange={handleSelected} />
          <label htmlFor="menu" >MENU</label>
          {/* border-bottom */}
          <span className={`h-0.5 w-full bg-orange-600 bg-opacity-0 hover:bg-opacity-100 absolute bottom-0 inset-x-0`}></span>
        </div>
      </div>

      {/* categories items */}
      <ul className={`text-xs transition-all ease-in duration-150 ${selected==="categories" ? "opacity-100 pointer-events-auto h-auto" : "opacity-0 pointer-events-none h-0 overflow-hidden"}`}>
      {categories.map(category=>(
        <Link to={`/products/${category.text}`} key={category.text} className='flex mb-4 gap-2 items-center border-b-[1px] border-gray-200 pb-4 px-6'> 
          <img src={category.icon} alt={category.text} className='w-5'/>
          <span>{category.text}</span>
        </Link>
      ))}
      </ul>

      {/* menu items */}
      <ul className={`text-xs transition-all ease-in duration-150 ${selected==="menu" ? "opacity-100 pointer-events-auto " : "opacity-0 pointer-events-none "}`}>
        {menu_items.map(item=>(
          <Link to={item.link} key={item.name} className='flex flex-col mb-4 border-b-[1px] border-gray-200 pb-4 px-6'> {item.name} </Link>
        ))}  
      </ul>

    </div></>
  )
}

export default Sidebar;