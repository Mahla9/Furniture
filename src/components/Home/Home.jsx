
import React, {Suspense} from 'react';
import Header from '../Header/Header';
import BannerSlider from '../Banner/BannerSlider';
import Main from './Main';
import Footer from '../Footer/Footer';

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
