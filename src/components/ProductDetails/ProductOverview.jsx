import React, {useState} from 'react';
import { useCartStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { GitCompareArrows, Heart, Star } from 'lucide-react';
import AccordionItem from './AccordionItem';


function ProductOverview({product}) {
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
    <div className='flex flex-col justify-center gap-3'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-3xl font-semibold'>{product.title}</h2>
            <span className='text-4xl font-bold text-gray-800 self-end border rounded-lg p-3 border-slate-100'>{product.brand}</span>
            <span className='mb-6'>SKU : <span className='text-slate-500'>{product.category} - {product.productId}</span></span>
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
              <button type='button' onClick={()=>addToCart(product)} className='bg-orange-400 text-white py-2 px-3 rounded-full text-sm font-semibold w-full'>Add To Cart</button>
              <button type='button' onClick={()=>navigate('/cart')} className='bg-gray-950 transition-all duration-200 ease-out hover:bg-gray-950/95 text-white px-3 py-2 rounded-full text-sm font-semibold w-full'>Buy Now</button>
            </div>
            <div className='flex gap-6'>
              <span className='flex gap-2 text-sm font-semibold text-gray-800'><GitCompareArrows/> Add To Compare</span>
              <span className='flex gap-2 text-sm font-semibold text-gray-800 cursor-pointer transition-all duration-500 ease-out hover:text-slate-500'><Heart/> Add To Wishlist </span>
            </div>

            {/* Arcardon */}
            <div className='flex flex-col my-6'>
                <AccordionItem title="Shipping and Returns" index={1} openArcardon={openArcardon} setOpenArcardon={setOpenArcardon}>
                    Authorities in our business will tell in no uncertain terms that Lorem Ipsum is that huge, huge no no to forswear forever. Not so fast, I'd say, there are some redeeming factors in favor of greeking text, as its use is merely the symptom of a worse problem to take into consideration.
                </AccordionItem>

                <AccordionItem title="Product Care" index={2} openArcardon={openArcardon} setOpenArcardon={setOpenArcardon}>
                    Anyway, you still use Lorem Ipsum and rightly so, as it will always have a place in the web workers toolbox, as things happen, not always the way you like it, not always in the preferred order.
                </AccordionItem>
            </div>

          </div>
          {/* End Product Overview */}
        </div>
  )
}

export default ProductOverview;