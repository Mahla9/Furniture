import React from 'react'
import { useAuth } from '../../../store/store';
import ProductCard from '../../Home/ProductCard'
import Header from '../../Header/Header';

function WishlistDashboard() {
    const wishList = useAuth(state=>state.wishList);

  return (
    <div className='flex flex-col gap-3'>
    <h2 className='mb-6 font-semibold text-gray-700 text-xl'>Wishlist</h2>
    <div className='child:w-64 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {wishList?.length>0 && wishList.map(item=>
      // add a remove button from remove wishlist items
        <ProductCard key={item.productId} product={item} list="col"/>
      )}
    </div>
    </div>
  )
}

export default WishlistDashboard;