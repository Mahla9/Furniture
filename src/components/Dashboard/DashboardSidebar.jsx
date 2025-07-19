import React from 'react'
import { Link} from 'react-router-dom';
import { useAuth } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function DashboardSidebar({active}) {
  const logout = useAuth(state=>state.signOut);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('logOut successfully');
    navigate('/');
  }

    const sections = [
        { label: "Dashboard", value: "dashboard" },
        { label: "Orders", value: "orders" },
        { label: "Addresses", value: "addresses" },
        { label: "Account details", value: "account" },
        { label: "Wishlist", value: "wishlist" },
      ]
  return (
    <div className='md:basis-2/5 xl:basis-1/5 bg-white rounded-lg p-3'>
      <ul className='flex flex-col gap-1'>
        {sections.map(section=>
            <Link key={section.value} to={`/dashboard/${section.value}`} className={`p-2 transition-all duration-150 ease-in hover:text-orange-500 ${active===section.value ? "bg-gray-300 font-bold" : ""}`}>
                {section.label}
            </Link>
        )}
        <div key="logout" onClick={handleLogout} className='cursor-pointer p-2 transition-all duration-150 ease-in hover:text-orange-500'>Logout</div>
      </ul>
    </div>
  )
}

export default DashboardSidebar;