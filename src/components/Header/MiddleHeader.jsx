import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import SideLogin from './SideLogin'

function MiddleHeader() {
    // const { isAuthenticated, user } = useAuthStore()
    // recieve total amount card
    // recive length item in cart for badge
    // const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSideLogin, setShowSideLogin] = useState(false);

    function handleDragStart(e){
        // dataTransfer for drag & drop - like a bag contain of drop information 
        e.dataTransfer.setData("type", "cart");
    }

  return (
    <div className='w-full flex justify-between lg:justify-normal'>
        {/* menu hamburger */}
        <button className='lg:hidden bg-transparent border-none size-2' onClick={()=>setShowSidebar(!showSidebar)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
        {showSidebar && <Sidebar setShowSidebar={setShowSidebar}/>}

        {/* logo */}
        <h1 className='font-bold text-black size-2'> Furniture </h1>

        {/* search bar */}
        <div className='w-full lg:hidden'>
            <input className='w-full relative pl-3 placeholder:text-gray-500' type="search" placeholder='search for products'/>
            <span className=' absolute top-1/2 left-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </span>
        </div>

        {/* icons and login */}
        <div className='flex gap-2 lg:hidden'>
            {/* compare */}
            <div className='bg-gray-400 cursor-pointer rounded-full p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                </svg>
            </div>

            {/* wishlist */}
            {/* onClick={navigate('/wishlist')} */}
            <div className='bg-gray-400 cursor-pointer rounded-full p-2' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </div>

            {/* login/register */}
            <div className='flex' draggable onDragStart={handleDragStart} onClick={()=>setShowSideLogin(!showSideLogin)} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span>
                    {/* const { isAuthenticated, user } = useAuthStore() */}
                    Login / Register
                </span>
            </div>
            {showSideLogin && <SideLogin setShowSideLogin={setShowSideLogin} />}
        </div>

        {/* cart */}
        <div className='relative'>
            <div className='bg-transparent lg:bg-black rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black lg:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className='lg:hidden text-white '>
                    $0.00
                </span>
            </div>

            {/* badge cart */}
            <div className='bg-orange-600 lg:bg-white text-white lg:text-orange-600 p-1 rounded-full absolute top-0 right-0'>
                0
            </div>
        </div>
    </div>
  )
}

export default MiddleHeader;