import React, {useState} from 'react';
import { useCartStore } from '../../store/store';
import { toast } from 'react-toastify';

function CouponForm({couponForm}) {
    const subTotal = useCartStore(state=>state.calculateSubtotal);
    const [couponCode, setCouponCode] = useState('');

    const discount = JSON.parse(localStorage.getItem('discount')) || null ;
    
    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (discount !== null) toast.warning('you apply coupon form already!');
        else if (couponCode.toLowerCase() === 'dis20') {
          const discount = subTotal() * 0.2;
          localStorage.setItem('discount', subTotal() - discount);
          toast.success('success discount')
        } else {
          localStorage.setItem('discount', subTotal())
          toast.error("Coupon code is Invalid");
        }
    };

  return (
    <form onSubmit={handleApplyCoupon} className={`flex flex-col gap-6 transition-all duration-300 ease-in px-4 py-6 border-2 rounded-2xl ${couponForm ? "h-auto block pointer-events-auto" : "h-0 hidden pointer-events-none"}`}>
        <label className='text-gray-700'>If you have a coupon code, please apply it below.</label>
        <div className='flex gap-3 items-center'>
          <input type="text" className='bg-transparent border border-gray-400 rounded-full h-10 pl-3' placeholder='Coupon Code' value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} />
          <button type="submit" className='text-white bg-orange-300 cursor-pointer rounded-full hover:bg-orange-700 hover:bg-opacity-75 py-2 px-4'>Apply coupon</button>
        </div>
    </form>
  )
}

export default CouponForm;