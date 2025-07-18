import React, { useEffect, useMemo } from 'react';
import { useCartStore } from '../../store/store';


function ShippingBar() {
    const calculateSubtotal = useCartStore(state=>state.calculateSubtotal)
    const subtotalPrice = calculateSubtotal();
    const FreeShipping = 1300;
    const fee = 50;
    
    const discountSubTotal = localStorage.getItem('discount');

    // تبدیل رشته به عدد (مهم!)
    const discount = discountSubTotal ? parseFloat(discountSubTotal) : null;

    const total = useMemo(() => {
        if (discount !== null) return discount < FreeShipping ? discount + fee : discount;
        else return subtotalPrice < FreeShipping ? subtotalPrice + fee : subtotalPrice;
    }, [discount, subtotalPrice]);


    if (total>0) localStorage.setItem('total-temp', total);

    useEffect(()=>{
        // re render after per change discountSubTotal
    },[discountSubTotal]);

    return (
    <div>
        <div className='flex flex-col'>
            <div className='flex items-center justify-between border-t py-3'>
                <h4>Subtotal</h4>
                <span className='text-orange-400'>${subtotalPrice}</span>
            </div>
            <div className='flex items-center justify-between border-t py-3'>
                <h4>Shipping</h4>
                <span>
                    {discount !== null 
                    ? (discount < FreeShipping ? `$${fee}` : "Free Shipping") 
                    : (subtotalPrice < FreeShipping ? `$${fee}` : "Free Shipping")}
                </span>
            </div>
            <div className='flex items-center justify-between border-t py-3'>
                <h4>Total</h4>
                <span className='text-orange-400 font-semibold'>${total}</span>
            </div>
        </div>

        <div className='flex flex-col gap-2'>
            <p>
                {
                    (discount !== null
                    ? discount >= FreeShipping
                    : subtotalPrice >= FreeShipping)
                    ? "Your order qualifies for free shipping!"
                    : `Add $${FreeShipping - (discount !== null ? discount : subtotalPrice)} to cart and get free shipping`
                }
            </p>

            <div className='h-3 rounded-full w-full overflow-hidden bg-gray-200'>
                <div className='h-full bg-orange-300' style={{width:`${(Math.min(discount??subtotalPrice,FreeShipping)/FreeShipping)*100}%`}}></div>
            </div>
        </div>
    </div>
  )
}

export default ShippingBar;