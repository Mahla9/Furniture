import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Searchbox from './Searchbox';

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
      <div className='my-2 mx-1'><Searchbox/></div>

      {/* select option */}
      <div className='flex items-center justify-center mb-5 w-full '>
        <div className={`relative group/category py-3 w-full text-center text-sm ${selected==="categories" ? "text-gray-600 bg-gray-300" : "text-gray-400 bg-gray-100"} font-semibold`}>
          <input type="radio" name='side-menu' hidden id='categories' onChange={handleSelected}/>
          <label htmlFor="categories"className='cursor-pointer' >CATEGORIES</label>
          {/* border-bottom */}
          <span className={`group h-0.5 w-0 bg-orange-600 transition-all duration-300 ease-linear group-hover/category:w-full absolute bottom-0 inset-x-0 `}></span>
        </div>
        
        <div className={`relative group/menu py-3 w-full text-center text-sm ${selected==="menu" ? "text-gray-600 bg-gray-300" : "text-gray-400 bg-gray-100"} font-semibold`}>
          <input type="radio" name='side-menu' hidden id='menu' onChange={handleSelected} />
          <label htmlFor="menu" className='cursor-pointer'>MENU</label>
          {/* border-bottom */}
          <span className={`h-0.5 w-0 bg-orange-600 transition-all duration-300 ease-linear group-hover/menu:w-full absolute bottom-0 inset-x-0`}></span>
        </div>
      </div>

      {/* categories items */}
      <ul className={`text-xs transition-all ease-in duration-150 ${selected==="categories" ? "opacity-100 pointer-events-auto overflow-y-auto h-[calc(100%-100px)]" : "opacity-0 pointer-events-none h-0 overflow-hidden"}`}>
      {categories.map(category=>(
        <Link to={`/products/${category.text}`} key={category.text} className='flex mb-4 gap-2 items-center border-b-[1px] border-gray-200 pb-4 px-6 hover:text-orange-500'> 
          <img src={category.icon} alt={category.text} className='w-5'/>
          <span>{category.text}</span>
        </Link>
      ))}
      </ul>

      {/* menu items */}
      <ul className={`text-xs transition-all ease-in duration-150 ${selected==="menu" ? "opacity-100 pointer-events-auto overflow-y-auto h-[calc(100%-100px)]" : "opacity-0 pointer-events-none "}`}>
        {menu_items.map(item=>(
          <Link to={item.link} key={item.name} className='flex flex-col mb-4 border-b-[1px] border-gray-200 pb-4 px-6 hover:text-orange-500'> {item.name} </Link>
        ))}  
      </ul>

    </div></>
  )
}

export default Sidebar;