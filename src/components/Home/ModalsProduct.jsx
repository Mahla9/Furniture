import React, { useState } from 'react'
import { useCartStore, useProductStore } from '../../store/store'
import { useNavigate } from 'react-router-dom';

function ModalsProduct({ activePing }) {
  const [loadingImg, setLoadingImg] = useState(true);

  const products = useProductStore((state) => state.products);

  const product = products && activePing
    ? products.find((p) => String(p.productId) === activePing.productId)
    : null;

  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  if (!activePing || !product) return null;

  return (
    <div
      className="w-52 absolute left-1/2 -translate-x-1/2 bg-white shadow-black/20 shadow-lg p-3 rounded-lg text-center z-50"
      style={{
        top: activePing?.top,
      }}
    >
      {loadingImg && <span className='my-3 flex justify-center items-center animate-spin rounded-full border-4 border-orange-400 border-t-transparent w-6 h-6 '></span>}
      <img
        src={product.image}
        alt={product.title}
        loading='lazy'
        onLoad={()=>setLoadingImg(false)}
        onClick={() => navigate(`/product/${activePing.productId}`)}
        className="cursor-pointer mb-2"
      />
      <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="bg-orange-400 rounded-full text-xs mt-3 text-white px-3 py-1 hover:bg-orange-500"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ModalsProduct;