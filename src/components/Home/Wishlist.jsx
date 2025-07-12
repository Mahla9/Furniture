import React from 'react';
import ProductCard from './ProductCard';
import { useAuth } from '../../store/store';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Wishlist() {
    const wishList = useAuth(state=>state.wishList)
  return (
    <div>
        <Header/>
        <div className='container my-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {wishList.map(item => (
            <ProductCard key={item.productId} product={item} list="col"/>
          ))}
        </div>
        <Footer/>
    </div>
  )
}

export default Wishlist;