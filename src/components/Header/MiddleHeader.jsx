import React, { useState} from 'react';
import Sidebar from './Sidebar';
import SideLogin from './SideLogin'
import { useAuth, useCartStore } from '../../store/store';
import SideCart from './SideCart';
import { Heart, Menu, Shuffle, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import Searchbox from './Searchbox';

function MiddleHeader() {
    const subtotalPrice = useCartStore(state => state.calculateSubtotal);
    const toggleSideCart = useCartStore(state => state.toggleSideCart);
    const items = useCartStore(state=>state.items);
    const badge = items?.length ;

    const { user, isLoggedIn, signOut, showSideLogin, setShowSideLogin } = useAuth(useShallow(state=>({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        signOut: state.signOut,
        showSideLogin: state.showSideLogin,
        setShowSideLogin: state.setShowSideLogin
    })))

    const navigate = useNavigate();

    const [showSidebar, setShowSidebar] = useState(false); //menu

    const handleAuth = () => {
        if(!isLoggedIn) setShowSideLogin(true);
        else navigate('/dashboard');
    }
    
  return (
    <div className='flex justify-between lg:justify-stretch items-center px-4 py-2'>
        {/* menu hamburger */}
        <Menu className='size-6 lg:hidden bg-transparent border-none' onClick={()=>setShowSidebar(!showSidebar)}/>
        
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>

        {/* logo */}
        <h1 className='font-bold text-black size-8 text-xl md:text-3xl w-auto mr-4 leading-8'> Furniture </h1>

        {/* search bar */}
        <div className='hidden lg:block w-full'><Searchbox/></div>
        

        {/* icons and login */}
        <div className='ml-4 hidden gap-2 lg:flex items-center text-gray-800'>
            {/* compare */}
            <div className='bg-gray-200 cursor-pointer rounded-full p-2 transition-all ease-in duration-200 hover:text-gray-600'>
                <Shuffle className='size-5'/>
            </div>

            {/* wishlist */}
            {/* onClick={navigate('/wishlist')} */}
            <div className='bg-gray-200  cursor-pointer rounded-full p-2 transition-all ease-in duration-200 hover:text-gray-600' >
                <Heart className='stroke-[1.5px]' onClick={()=>navigate('/wishlist')}/>
            </div>

            {/* login/register */}
            <div className={`flex cursor-pointer bg-gray-200 p-1 rounded-xl transition-all ease-in duration-200 hover:text-gray-600 ${isLoggedIn?" group/dashboard relative":""}`} 
                onClick={handleAuth}>
                <UserRound className='text-gray-800 size-6 stroke-1'/>
                <span className='text-nowrap text-sm'>
                    {isLoggedIn ? `Hello, ${user.username}` : "Login / Register"}
                </span>

                <div className='absolute top-8 left-0 bg-white p-2 rounded-lg z-20 transition-all duration-200 ease-in-out opacity-0 pointer-events-none group-hover/dashboard:opacity-100 group-hover/dashboard:pointer-events-auto'>
                    <ul className='flex flex-col gap-1.5 text-gray-400 child:hover:bg-orange-200'>
                        <li onClick={()=>navigate('/dashboard')} className='transition-all duration-150 ease-in-out hover:bg-orange-400/75 p-3'>Dashboard</li>
                        <li onClick={()=>navigate('/dashboard/orders')} className='transition-all duration-150 ease-in-out hover:bg-orange-400/75 p-3'>Orders</li>
                        <li onClick={()=>navigate('/dashboard/addresses')} className='transition-all duration-150 ease-in-out hover:bg-orange-400/75 p-3'>Adresses</li>
                        <li onClick={()=>navigate('/dashboard/account')} className='text-nowrap transition-all duration-150 ease-in-out hover:bg-orange-400/75 p-3'>Acount details</li>
                        <li onClick={()=>navigate('/dashboard/wishlist')} className='transition-all duration-150 ease-in-out hover:bg-orange-400/75 p-3'>Wishlist</li>
                        <li onClick={signOut} className='transition-all duration-150 ease-in-out hover:bg-orange-400/75 p-3'> Logout</li>
                    </ul>
                </div>
            </div>
            <SideLogin setShowSideLogin={setShowSideLogin} showSideLogin={showSideLogin}/>
        </div>

        {/* cart */}
        <div className='self-end lg:ml-4 relative cursor-pointer'
            onClick={toggleSideCart} >
            <div className='bg-transparent lg:bg-black rounded-md flex py-1 px-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black lg:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className=' hidden lg:flex text-white '>
                    {subtotalPrice()>0 ? `$${subtotalPrice()}`: "$0.00"}
                </span>
            </div>

            {/* badge cart */}
            <div className='bg-orange-600 lg:bg-white text-white lg:text-orange-600 shadow-2xl w-4 h-4 absolute -top-2 -right-2 text-xs rounded-md text-center leading-4'>
                {badge}
            </div>
            
        </div>
        <SideCart/>

    </div>
  )
}

export default MiddleHeader;