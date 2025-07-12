import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/store';


function CalculateTotal() {
    const getTotalPrice = useCartStore(state=>state.calculateSubtotal)
    const subtotalPrice = getTotalPrice();
    const FreeShipping = 1300;
    const navigate = useNavigate();
    
    return (
    <>
        <div className='flex justify-between items-center mb-4 '>
            <h3 className='font-semibold text-gray-800'>Subtotal:</h3>
            <span className='text-orange-400 font-semibold text-base'>${subtotalPrice}</span>
        </div>
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <p>
                    {subtotalPrice===FreeShipping || subtotalPrice> FreeShipping ? 
                    "Your order qualifies for free shipping!": 
                    `Add $${FreeShipping-subtotalPrice} to cart and get free shipping`}
                </p>

                <div className='h-2 rounded-full w-full overflow-hidden bg-gray-200'>
                    <div className='h-full bg-orange-400' style={{width:`${(Math.min(subtotalPrice,FreeShipping)/FreeShipping)*100}%`}}></div>
                </div>
            </div>
            <button className='w-full py-2 mt-4 rounded-full bg-slate-200 text-gray-800 transition-all duration-200 ease-linear hover:bg-slate-300'>View cart</button>
            <button className='w-full py-2 rounded-full bg-orange-400 text-white transition-all duration-200 ease-linear hover:bg-orange-500' onClick={()=>navigate('/checkout')}>Checkout</button>
        </div>
    </>
  )
}

export default CalculateTotal;