import React from 'react'
import { useCartStore, useProductStore } from '../../store/store'
import { useNavigate } from 'react-router-dom';

function ModalsProduct({productId}) {
    const products = useProductStore(state=>state.products);
    const product = products?.find(item => item.id === productId);

    const addToCart = useCartStore(state => state.addToCart);

    const navigate = useNavigate();
  return (
    <div className='max-w-44 absolute top-3 p-3 rounded-lg bg-white shadow-black/20 shadow-lg'>
      {product && <>
        <img src={product.image} alt={product.title} onClick={() => navigate(`/product/${productId}`)} />
        <p>{product.description}</p>
        <button type="button" onClick={() => addToCart(product)} className='bg-orange-400 rounded-full text-sm mt-3 text-white px-3 py-1'>Add to Cart</button>
      </>}
    </div>
  )
}

export default ModalsProduct;