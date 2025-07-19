import React, { memo, useCallback, useMemo } from 'react';
import { Heart, ShoppingCart, Shuffle, Search, Star } from 'lucide-react';
import { useCartStore, useAuth } from '../../store/store';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';


function ProductCard({product,list,carousel}) {
    const navigate = useNavigate();
    const addToCart = useCartStore(state=>state.addToCart);
    const {toggleWishList, wishList} = useAuth(
      useShallow(state=>({
        toggleWishList: state.toggleWishList,
        wishList: state.wishList
      }))
    );
    const isLiked = useMemo(()=>{
      return wishList.some(item => item.productId === product.productId);
    },[product.productId, wishList]);

    const handleLiked = useCallback((product) => {
      toggleWishList(product);
    },[toggleWishList]);
    
    const discountedPrice = (product)=> (product.price - (product.price * product.discount / 100));

  return (
    <div key={product.productId} className={`relative ${carousel ? "w-48 sm:min-w-60 md:min-w-54 shrink-0" : "" } bg-white flex  ${list === "col" ? "flex-col hover:-translate-y-3" : "flex-row"} rounded-lg shadow-lg shadow-gray-300 overflow-hidden transition-transform duration-150 ease-in group/card`}>
            <Heart className={`absolute top-2 right-2 w-5 z-10 cursor-pointer ${isLiked?"fill-red-700 stroke-red-700":"fill-none stroke-gray-500"}`} onClick={()=>handleLiked(product)} />
            <div className='absolute top-2 left-2 z-10'>
            {product.discount && <div className='px-2 mb-1 bg-orange-400 rounded-xl text-white text-center text-sm'>-{product.discount}%</div>}
            {product.isNew && <div className='px-2 mb-1 bg-lime-500 rounded-xl text-white text-center text-sm'>New</div>}
            {product.isHot && <div className='px-2 bg-red-600 rounded-xl text-white text-center text-sm'>Hot</div>}
            </div>

            {/* image card */}
            <div className={`lg:translate-y-3 transition-all duration-150 ease-in flex justify-center cursor-pointer ${list==="col" ? "lg:group-hover/card:translate-y-0" : ""}`} onClick={()=>navigate(`/product/${product.productId}`)}>
              <img src={product.image} alt={product.title} loading='lazy' className='aspect-square object-cover'/>
            </div>

            {/* info card */}
            <div className={`flex w-full flex-col gap-2 px-4 pb-3 transition-all duration-150 ease-in ${list==="row" ? "lg:translate-y-14" : "lg:translate-y-14 lg:group-hover/card:translate-y-0"}`}>
              {/* name and category */}
              <div> 
                <div className='flex justify-between items-center'>
                  <a href={`/product/${product.productId}`} draggable="true">
                    <h3 className='text-sm font-semibold text-gray-600 cursor-pointer' onClick={(e)=>{ e.preventDefault(); navigate(`/product/${product.productId}`); }} >{product.title}</h3>
                  </a>

                  {product.rating && 
                  <span className='flex items-center overflow-hidden text-xs font-semibold text-gray-700'>
                    {product.rating} <Star className='fill-yellow-400 text-yellow-400 size-5'/>
                  </span>}
                </div>

                <span className='text-sm text-gray-500'>{product.category}</span>
              </div>

              <div className='flex justify-between'>
                {/* price or discount */}
                  <div className='text-xs font-semibold'>
                    <span className={`${product.discount?"line-through text-gray-400 font-semibold":"text-orange-400 font-bold"}`}>${product.price.toFixed(2)}</span>
                    {product.discount && <span className='ml-2 text-orange-400 font-bold'>${discountedPrice(product)}</span>}
                  </div>    
                {/* colors select option */}
                {product.colors?.length>0 && (
                  <div className='flex gap-3'>
                  {product.colors.map((color, index)=>(
                    <span key={index} className="h-2.5 w-2.5 rounded-full cursor-pointer outline outline-1 outline-gray-400 outline-offset-[2.5px]" style={{backgroundColor: color.code}}></span>
                  ))}
                  </div>
                )}
              </div>

              {/* button */}
              <div className={`flex gap-1 mt-4 justify-center items-center ${list==="col" ? "opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100" : ""}`}>
                <button type='button' onClick={()=>addToCart(product)}
                className='w-full relative bg-orange-400 rounded-2xl h-8 text-white group/cart'>
                  <span className='absolute inset-0 text-nowrap text-xs lg:text-sm flex items-center justify-center font-semibold transition-all duration-200 ease-in 
                      group-hover/cart:-translate-y-7 group-hover/cart:opacity-0'>
                    Add to cart
                  </span>
                  <span className='absolute left-1/2 -translate-x-1/2 transition-all duration-200 ease-in translate-y-7 opacity-0 
                    group-hover/cart:-translate-y-2.5 group-hover/cart:opacity-100'>
                      <ShoppingCart className='size-5'/>
                  </span>
                </button>

                <div className='hidden md:block relative group/compare group/tooltip'>
                  <Shuffle className='text-gray-600 cursor-pointer stroke-1 size-5 xl:size-6'/>
                  <div className='absolute opacity-0 group-hover/compare:opacity-100 text-xs text-nowrap -top-8 left-1/2 -translate-x-1/2 bg-gray-800 bg-opacity-95 rounded-md text-white px-3 py-1.5 transition-all duration-200 ease-in-out custom-point'>
                    Add to Compare
                  </div>
                </div>

                <div className='hidden md:block relative group/quickView'>
                  <Search className='text-gray-600 cursor-pointer stroke-1 size-5 xl:size-6'/>
                  <div className='absolute opacity-0 group-hover/quickView:opacity-100 text-xs text-nowrap -top-8 -left-12 bg-gray-800 bg-opacity-95 rounded-md text-white px-3 py-1.5 transition-all duration-200 ease-in-out '>
                    Quick View
                  </div>
                </div>

              </div>
            </div>

          </div>
  )
}

export default memo(ProductCard);