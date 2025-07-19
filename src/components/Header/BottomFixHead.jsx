import { FilterIcon, Heart, LucideShoppingBag, User2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/store';

function BottomFixHead({filters,setShowFilterbar}) {
    const navigate = useNavigate();
    const user = useAuth(state=>state.user);

    const handleUser = () =>{
        if(user !== null ) navigate('/dashboard');
        else navigate('/auth/login');
    }

  return (
    <nav className='z-20 fixed bottom-0 inset-x-0 flex bg-white shadow-[0_-4px_16px_2px_rgba(0,0,0,0.35)] md:hidden py-2 px-3 justify-around items-center'>
        <span className='flex flex-col items-center gap-1 text-slate-500' onClick={handleUser}>
            <User2/>
            <span>User</span>
        </span>
        
        <span className='flex flex-col items-center gap-1 text-slate-500' onClick={()=>navigate('/wishlist')}>
            <Heart/>
            <span>Wishlist</span>
        </span>
        
        {filters && 
            <span className='flex flex-col items-center gap-1 text-slate-500' onClick={()=>setShowFilterbar(true)}>
                <FilterIcon/>
                <span>Filters</span>
            </span>
        }
        
        <span className='flex flex-col items-center gap-1 text-slate-500' onClick={()=>navigate('/shop')}>
            <LucideShoppingBag/>
            <span>Shop</span>
        </span>
    </nav>
  )
};

export default BottomFixHead;