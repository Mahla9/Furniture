import { HeartHandshake, ListChecks, LocateFixed, LogOut, User2 } from 'lucide-react';
import React from 'react';
import { useAuth } from '../../../store/store';
import { Link } from 'react-router-dom';

function Dashboard() {
    const logout = useAuth(state=>state.signOut);
    const username = useAuth(state=>state.user.username)

    const classLink = 'cursor-pointer bg-slate-50 transition-all duration-100 easr-in hover:bg-slate-200 min-w-36 md:min-w-44 p-9 border rounded-lg border-gray-300 flex flex-col items-center justify-center';

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <h4>hello <strong className='text-stone-400'>{username}</strong> (not {username}? <a href='/' className='text-stone-600 font-semibold hover:text-blue-400' onClick={logout}>LogOut</a>)</h4>
                <p className='text-stone-700 max-w-[800px]'>From your account dashboard you can view your recent orders, manage your shipping, and edit your password and account details.</p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 child:rounded-lg'>
                <Link to={`/dashboard/orders`} className={classLink}>
                    <ListChecks className='text-stone-400 size-10'/>
                    <span >Orders</span>
                </Link>
                <Link to={`/dashboard/addresses`} className={classLink}>
                    <LocateFixed className='text-stone-400 size-10'/>
                    <span >Addresses</span>
                </Link>
                <Link to={`/dashboard/account`} className={classLink} >
                    <User2 className='text-stone-400 size-10'/>
                    <span>Account Details</span>
                </Link>
                <Link to={`/dashboard/wishlist`} className={classLink}>
                    <HeartHandshake className='text-stone-400 size-10'/>
                    <span>Wishlist</span>
                </Link>

                <Link key="logout" to='/' onClick={logout} className={classLink}>
                    <LogOut className='text-stone-400 size-10'/>
                    <span>Logout</span>
                </Link>
            </div>
        </div>
  )
}

export default Dashboard;