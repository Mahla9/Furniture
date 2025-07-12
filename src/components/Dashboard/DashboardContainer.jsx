import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BannerStatic from '../Banner/BannerStatic';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import { useParams } from 'react-router-dom';

function DashboardContainer() {
  const {content} = useParams() ;

  return (
    <div>
      <Header/>
      <BannerStatic/>

      {/* main */}
      <div className='container flex my-9 gap-6'>
        {/* Sidebar ul */}
        <DashboardSidebar active={content}/>

        {/* content */}
        <DashboardContent section={content}/>
      </div>

      <Footer/>
    </div>
  )
}

export default DashboardContainer;