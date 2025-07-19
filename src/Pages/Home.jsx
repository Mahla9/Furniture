
import React, {Suspense} from 'react';
import Header from '../components/Header/Header';
import BannerSlider from '../components/Banner/BannerSlider';
import Main from '../components/Home/Main';
import Footer from '../components/Footer/Footer';

function Home() {
  
  return (
    <div>
        <Header />
        <BannerSlider/>
        <Main />
        <Footer/>
    </div>
  )
}

export default Home
