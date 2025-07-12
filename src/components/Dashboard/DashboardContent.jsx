import React from 'react';
import { useParams } from 'react-router-dom';
import Addresses from './dashboardSections/Addresses';
import AcountDetails from './dashboardSections/AcountDetails';
import Wishlist from './dashboardSections/Wishlist';
import Orders from './dashboardSections/Orders';
import Dashboard from './dashboardSections/Dashboard';


// const Skeleton = () => (
//     <div className="animate-pulse space-y-4">
//       <div className="h-6 bg-gray-300 rounded w-1/2"></div>
//       <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//       <div className="h-4 bg-gray-200 rounded w-full"></div>
//       <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//     </div>
//   )

function DashboardContent() {
    const {content} = useParams();

    switch (content) {
      case 'addresses':
        return <Addresses/> ;
      case 'account':
        return <AcountDetails/>

      case 'wishlist':
        return <Wishlist />

      case 'orders':
        return <Orders/>
    
      default:
        return <Dashboard/>
    }

}

export default DashboardContent;