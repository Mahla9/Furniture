import React, {useEffect, useState} from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Breadcrump from '../components/Banner/Breadcrump';
import { useParams } from 'react-router-dom';
import { useCartStore, useProductStore } from '../store/store';
import { useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';
import { ArrowRight, GitCompareArrows, Heart, Star } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

function ProductDetails() {
  const {productId} = useParams();
  const products = useProductStore(state=>state.products);
  
  const product = products?.find(p => p.productId.toString() === productId);
useEffect(()=>{
    console.log(products)
    console.log(product)
  },[products,product])
  
  const {addToCart, reduceQuantityItem, addQuantityItem} = useCartStore(useShallow( 
    state=>({
      addToCart: state.addToCart,
      reduceQuantityItem: state.reduceQuantityItem,
      addQuantityItem: state.addQuantityItem
    })
  ));
  const discountedPrice = product?.discount ? (product.price - (product.price * product.discount)).toFixed(2) : null;

  const [openArcardon, setOpenArcardon] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const addQuantity = (productId) => {
    setQuantity(prev => prev + 1);
    addQuantityItem(productId);
  };

  const minusQuantity = (productId) => {
    setQuantity(prev => Math.max(prev - 1, 1));
    reduceQuantityItem(productId);
  };

  return (
    <div>
      <Header/>
      <Breadcrump/>

      {/* Star Product Overview */}
      <div className='container bg-white rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-0 items-start'>
        <img src={product?.image} alt={product?.name} className='rounded-lg w-[80%]'/>
        {product && (
        <div className='flex flex-col justify-center gap-3'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-3xl font-semibold'>{product.title}</h2>
            <span className='text-4xl font-bold text-gray-800 self-end border rounded-lg p-3 border-slate-100'>{product.brand}</span>
            <span className='mb-6'>SKU : <span className='text-slate-500'>{product.category} - {productId}</span></span>
            {product.rating !== null && 
            <div className='flex gap-3'>
              <Star className='stroke-amber-400 fill-amber-400'/> 
              <span>{product.rating}</span>
            </div>
            }

            <span className='text-slate-500'> {product.description} </span>
            <div className='flex gap-3 items-center'>
              <span className={`${product.discount ? 'line-through text-gray-400 font-semibold' : 'text-orange-400 font-bold text-2xl md:text-3xl lg:text-4xl'}`}> $ {product.price.toFixed(2)} </span>
              {product.discount && <span className='ml-2 text-orange-400 font-bold text-2xl md:text-3xl lg:text-4xl'>${discountedPrice}</span>}
            </div>

            {/* Add to Cart - Change Quantity */}
            <div className='flex w-full gap-3 md:gap-5 items-center my-6'>
              <div className='flex items-center justify-center rounded-full border overflow-hidden w-3/5'>
                <span className='text-lg px-3 border-r text-slate-600 cursor-pointer transition-all duration-200 ease-in active:bg-orange-400 hover:bg-orange-400' onClick={()=>minusQuantity(product.productId)}>-</span>
                <span className='mx-2 rounded-lg'>{quantity}</span>
                <span className='text-lg px-3 border-l text-slate-600 cursor-pointer transition-all duration-200 ease-in active:bg-orange-400 hover:bg-orange-400' onClick={()=>addQuantity(product.productId)}>+</span>
              </div>
              <button type='button' onClick={()=>addToCart()} className='bg-orange-400 text-white py-2 px-3 rounded-full text-sm font-semibold w-full'>Add To Cart</button>
              <button type='button' onClick={()=>navigate('/cart')} className='bg-gray-950 transition-all duration-200 ease-out hover:bg-gray-950/95 text-white px-3 py-2 rounded-full text-sm font-semibold w-full'>Buy Now</button>
            </div>
            <div className='flex gap-6'>
              <span className='flex gap-2 text-sm font-semibold text-gray-800'><GitCompareArrows/> Add To Compare</span>
              <span className='flex gap-2 text-sm font-semibold text-gray-800 cursor-pointer transition-all duration-500 ease-out hover:text-slate-500'><Heart/> Add To Wishlist </span>
            </div>

            {/* Arcardon */}
            <div className='flex flex-col my-6'>
              <div className='flex flex-col gap-3 overflow-hidden'>
                {/* header */}
                <div className='border-b border-slate-200 cursor-pointer pb-3 flex justify-between items-center' onClick={openArcardon===1 ? ()=>setOpenArcardon(-1) : () => setOpenArcardon(1)}>
                  <span>Shipping and Returns</span>
                  <span className={`transition-all duration-200 ease-in ${openArcardon===1? "rotate-90" : ""}`}><ArrowRight/></span>
                </div>
                {/* body */}
                <div className={`transition-all duration-500 ease-out text-slate-700 ${openArcardon === 1 ? "py-3 h-auto" : "h-0"}`}>Authorities in our business will tell in no uncertain terms that Lorem Ipsum is that huge, huge no no to forswear forever. Not so fast, I'd say, there are some redeeming factors in favor of greeking text, as its use is merely the symptom of a worse problem to take into consideration.</div>
              </div>

              <div className='flex flex-col gap-3 overflow-hidden'>
                <div className='border-b border-slate-200 cursor-pointer pb-3 flex justify-between items-center' onClick={openArcardon===2 ? ()=>setOpenArcardon(-1) : () => setOpenArcardon(2)}>
                  <span>Product Care</span>
                  <span className={`transition-all duration-200 ease-in ${openArcardon===2? "rotate-90" : ""}`}><ArrowRight/></span>
                </div>
                <div className={`transition-all duration-500 ease-out text-slate-700 ${openArcardon === 2 ? "py-3 h-auto" : "h-0"}`}>Anyway, you still use Lorem Ipsum and rightly so, as it will always have a place in the web workers toolbox, as things happen, not always the way you like it, not always in the preferred order.</div>
              </div>
            </div>

          </div>
          {/* End Product Overview */}
        </div>
        )}
      </div>

      {/* Start Product Details */}
          <div className='container my-16 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg'>
            {/* Right or top section */}
            <div>
              <div>
                <h2 className='text-2xl font-semibold'>Product Details</h2>
                <p className='my-6 text-slate-500'>Made possible by exploring innovative molded plywood techniques, Iskos-Berlin’s Soft Edge Chair blends strong curves with extreme lightness to create a three-dimensionality not usually possible with 2-D plywood.</p>
              </div>
              <ul className='flex flex-col gap-3'>
                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Brand</span>
                  <span className='text-slate-600'>{product?.brand}</span>
                </li>

                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Collection</span>
                  <span className='text-slate-600'>{product?.title}</span>
                </li>

                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Color</span>
                  <span className='text-slate-600'>{product?.colors.length>0 ? product.colors.map(color => color.title).join(', ') : "Jet" }</span>
                </li>

                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Materials</span>
                  <span className='text-slate-600'> {product?.material} </span>
                </li>

                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Warranty</span>
                  <span className='text-slate-600'>36 Month</span>
                </li>
              </ul>
            </div>

            {/* left or bottom section */}
            <div >
              <h2 className='text-2xl font-semibold mb-6'>Description</h2>
              <img src="/images/description-about-product.jpg" alt="description about product" className='rounded-lg'/>
              <p className='my-6 text-slate-600'>The company reinterprets tradition by calling upon international designers to work with them and developing new technologies and materials to guarantee innovative and surprising results. Passion is the engine that drives the brand – together with its renowned creatives and high-profile collaborators – to search for original solutions using advanced materials, methods, tools, and technologies.</p>
              <ul className='list-disc list-inside text-slate-600 marker:text-orange-400'>
                <li>Choose items in a single color scheme and style</li>
                <li>Consider the area of the room</li>
                <li>Do not buy unnecessary pieces of furniture</li>
              </ul>
            </div>
          </div>
      <Brand brand={product?.brand} />
      <Footer/>
    </div>
  )
}

export default ProductDetails;