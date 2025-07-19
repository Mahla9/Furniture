import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BannerStatic from '../components/Banner/BannerStatic';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import DashboardContent from '../components/Dashboard/DashboardContent';
import { useParams } from 'react-router-dom';

function DashboardContainer() {
  const {content} = useParams() ;

  return (
    <div>
      <Header/>
      <BannerStatic/>

      {/* main */}
      <div className='container flex flex-col md:flex-row my-9 gap-6'>
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