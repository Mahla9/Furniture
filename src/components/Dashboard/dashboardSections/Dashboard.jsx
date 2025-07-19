import { HeartHandshake, ListChecks, LocateFixed, LogOut, User2 } from 'lucide-react';
import React from 'react';
import { useAuth } from '../../../store/store';
import { Link } from 'react-router-dom';

function Dashboard() {
    const logout = useAuth(state=>state.signOut);

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 child:rounded-lg'>

            <Link to={`/dashboard/orders`} className='cursor-pointer min-w-36 md:min-w-44 p-9 border rounded-lg border-gray-300 flex flex-col items-center justify-center'>
                <ListChecks/>
                <span >Orders</span>
            </Link>
            <Link to={`/dashboard/addresses`} className='cursor-pointer min-w-36 md:min-w-44 p-9 border rounded-lg border-gray-300 flex flex-col items-center justify-center'>
                <LocateFixed/>
                <span >Addresses</span>
            </Link>
            <Link to={`/dashboard/account`} className='cursor-pointer min-w-36 md:min-w-44 p-9 border rounded-lg border-gray-300 flex flex-col items-center justify-center'>
                <User2/>
                <span>Account Details</span>
            </Link>
            <Link to={`/dashboard/wishlist`} className='cursor-pointer min-w-36 md:min-w-44 p-9 border rounded-lg border-gray-300 flex flex-col items-center justify-center'>
                <HeartHandshake/>
                <span>Wishlist</span>
            </Link>

            <Link key="logout" to='/' onClick={logout} className='cursor-pointer min-w-36 md:min-w-44 p-9 border rounded-lg border-gray-300 flex flex-col items-center justify-center'>
                <LogOut/>
                <span>Logout</span>
            </Link>
        
    </div>
  )
}

export default Dashboard;