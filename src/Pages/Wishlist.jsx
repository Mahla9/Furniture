import React from 'react';
import ProductCard from '../components/Home/ProductCard';
import { useAuth } from '../store/store';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function Wishlist() {
    const isLoggedIn = useAuth(state=>state.isLoggedIn);
    const wishStore = useAuth(state=>state.wishList);
    const wishList = isLoggedIn ? wishStore : JSON.parse(localStorage.getItem("temp-wishlist")) || [] ;
  return (
    <div>
        <Header/>
        <div className='container my-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {wishList? wishList.map(item => (
            <ProductCard key={item.productId} product={item} list="col"/>
          )):(
            <div> No WishList </div>
          )}
        </div>
        <Footer/>
    </div>
  )
}

export default Wishlist;