import React, { useState } from 'react';
import {useCartStore, useCheckoutStore, useAuth} from '../store/store'
import Login from '../components/Auth/Login';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import CartItems from '../components/Cart/CartItems';
import ShippingBar from '../components/Cart/ShippingBar';
import {useForm} from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useShallow } from 'zustand/shallow';

const schema = yup.object().shape({
  firstName: yup.string().required().min(3 , 'name should be 3char at least'),
  lastName: yup.string().required().min(3 , 'lastname should be 3char at least'),
  phone: yup.string().required(),
  email: yup.string().required().email('email not invalid, please enter a valid email'),
  country: yup.string().required('country is required'),
  town: yup.string().required(),
  street: yup.string().required(),
  zipCode: yup.string().required().min(10).max(10, 'min and max should be 10 char')
})
function Checkout() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [couponForm, setCouponForm] = useState(false);
  const subTotal = useCartStore(state=>state.calculateSubtotal);
  const [couponCode, setCouponCode] = useState('');

  const isLoggedIn = useAuth(state=>state.isLoggedIn);
  const {shippingAddress, setShippingAddress, setPaymentMethod, addOrder} = useCheckoutStore(
    useShallow(state=>({
      shippingAddress: state.shippingAddress,
      setShippingAddress: state.setShippingAddress,
      setPaymentMethod: state.setPaymentMethod,
      addOrder: state.addOrder
    })));

  const clearCart = useCartStore(state=>state.clearCart)
  const items = useCartStore(state=>state.items);
  const id = uuidv4();
  const navigate = useNavigate();

  const {register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(schema)})


  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toLowerCase() === 'dis20') {
      const discount = subTotal() * 0.2;
      localStorage.setItem('discount', subTotal() - discount);
      // setError('');
    } else {
      localStorage.setItem('discount', subTotal())
      // setError("Coupon code is Invalid");
    }
  };

  const referToCompleted = () => {
    const total= localStorage.getItem('total-temp');
    const newOrder = {orderId: id, date: new Date().toLocaleDateString(), status: "on hold", total }
    addOrder(newOrder);
    navigate('/checkout/completed');
    clearCart();
  }

  return (
    <div className='mx-auto my-6 md:w-[70%] lg:w-[50%] flex flex-col justify-center gap-9'>
      <img src="/images/Logo.png" alt="WebNebula Logo" className='w-48 self-center'/>

      {/* login form */}
      <div className={`self-center flex flex-col ${isLoggedIn ? "hidden" : "block"}`}>
        <div>
          <span>Returning customer?</span>
          <span className='underline decoration-orange-400 text-orange-400 cursor-pointer' onClick={()=>setShowLoginForm(!showLoginForm)}>
            Click here to login
          </span>
        </div>
        
        <Login showLoginForm={showLoginForm}/>
      </div>

      {/* copoun */}
      <div className='self-center flex flex-col gap-9 overflow-hidden'>
        <div className='flex gap-3 justify-center'>
          <span>Have a coupon?</span>
          <span className='underline underline-offset-4 decoration-orange-400 text-orange-400 cursor-pointer ' onClick={()=>setCouponForm(!couponForm)}>
            Click here to enter youe code
          </span>
        </div>
        <form onSubmit={handleApplyCoupon} className={`flex flex-col gap-6 transition-all duration-300 ease-in px-4 py-6 border-2 rounded-2xl ${couponForm ? "h-auto block pointer-events-auto" : "h-0 hidden pointer-events-none"}`}>
          <label className='text-gray-700'>If you have a coupon code, please apply it below.</label>
          <div className='flex gap-3 items-center'>
            <input type="text" className='bg-transparent border border-gray-400 rounded-full h-10 pl-3' placeholder='Coupon Code' value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} />
            <button type="submit" className='text-white bg-orange-300 cursor-pointer rounded-full hover:bg-orange-700 hover:bg-opacity-75 py-2 px-4'>Apply coupon</button>
          </div>
        </form>
      </div>

      {/* 1- billing details */}
      <div className='flex items-center gap-3 self-start bg-slate-200 p-2 rounded-lg mt-16'>
        <span className=' bg-orange-400 px-4 py-2 rounded-full text-white'>1</span>
        <h2>Billing Details</h2>
      </div>
      <form method="get" className='self-center w-full flex flex-col gap-9'>
        <div className='flex gap-6'>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="first-name">First name</label>
            <input type="text" {...register('firstName')} id='first-name' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={isLoggedIn?shippingAddress.firstName:""} onChange={(e)=> setShippingAddress("firstName",e.target.value)}/>
            {errors.firstName && <p className='text-red-400 text-xs font-semibold'>{errors.firstName.message}</p>}
          </div>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="last-name">Last name</label>
            <input type="text" {...register('lastName')} id='last-name' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={isLoggedIn?shippingAddress.lastName:""} onChange={(e)=>setShippingAddress("lastName", e.target.value)}/>
            {errors.lastName && <p className='text-red-400 text-xs font-semibold'>{errors.lastName.message}</p>}
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="phone">Phone</label>
            <input type="tel" {...register('phone')} id='phone' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={isLoggedIn?shippingAddress.phone:""} onChange={(e)=>setShippingAddress("phone",e.target.value)}/>
            {errors.phone && <p className='text-red-400 text-xs font-semibold'>{errors.phone.message}</p>}
          </div>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <input type="email" {...register('email')} id='email' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={isLoggedIn?shippingAddress.email:""} onChange={(e)=>setShippingAddress("email",e.target.value)}/>
            {errors.email && <p className='text-red-400 text-xs font-semibold'>{errors.email.message}</p>}
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="country">Country / Region</label>
            <input type="text" {...register('country')} id='country' className='h-10 rounded-full px-3 focus:outline-none bg-transparent border border-gray-400'/>
            {errors.country && <p className='text-red-400 text-xs font-semibold'>{errors.country.message}</p>}
          </div>

          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="city">Town / City</label>
            <input type="text" {...register('town')} id='city' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={isLoggedIn?shippingAddress.city:""} onChange={e=>setShippingAddress("city", e.target.value)}/>
            {errors.town && <p className='text-red-400 text-xs font-semibold'>{errors.town.message}</p>}
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="street-address">Street address</label>
            <input type="text" {...register('street')} id='street-address' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={isLoggedIn?shippingAddress.streetAddress : ""} onChange={(e)=>setShippingAddress("streetAddress", e.target.value)}/>
            {errors.street && <p className='text-red-400 text-xs font-semibold'>{errors.street.message}</p>}
          </div>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="zip-code">ZIP Code</label>
            <input type="text" {...register('zipCode')} id='zip-code' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={isLoggedIn?shippingAddress.zipCode : ""} onChange={(e)=>setShippingAddress("zipCode", e.target.value)}/>
            {errors.zipCode && <p className='text-red-400 text-xs font-semibold'>{errors.zipCode.message}</p>}
          </div>
        </div>

        {/* create account */}
        <div className=''>
          <input type="checkbox" id='register' className='mr-1.5'/>
          <label htmlFor="register" >create an acount?</label>
        </div>

        <div className='flex flex-col gap-3'>
          <label htmlFor="notes">Order notes (optional)</label>
          <textarea name="" id="notes" rows="10" placeholder='note about your order' className='rounded-3xl px-6 py-3 bg-transparent border border-gray-400'></textarea>
        </div>
      </form>

      {/* 2- Your Order */}
      <div className='flex items-center gap-3 self-start bg-slate-200 p-2 rounded-lg mt-16'>
        <span className='bg-orange-400 px-4 py-2 rounded-full text-white'>2</span>
        <h2>Your Order</h2>
      </div>
      {/* step 2: in cart => built ready component */}
      <div className='flex flex-col'>
        {/* head */}
        <div className='flex justify-between items-center border-b py-3 mb-6'>
          <h3 className='text-gray-700 font-semibold text-xl'>PRODUCT</h3>
          <h3 className='text-gray-700 font-semibold text-xl'>SUBTOTAL</h3>
        </div>

        {/* items in cart */}
        <CartItems items={items}/>
        <ShippingBar />
      </div>


      <div className='flex items-center gap-3 self-start bg-slate-200 p-2 rounded-lg mt-16'>
        <span className='bg-orange-400 px-4 py-2 rounded-full text-white'>3</span>
        <h2>Payment Information</h2>
      </div>
      {/* step 3 => radio button for payment information */}
      <div className='flex flex-col gap-9'>
        <div>
          <input type="radio" name="payment" id="bank" value="Direct bank transfer" onChange={e=>setPaymentMethod(e.target.value)}/>
          <label htmlFor="bank">Direct bank transfer</label>
          {/* info about this payment and style h-auto or h-0 */}
        </div>

        <div>
          <input type="radio" name="payment" id="check" value="Check payments" onChange={e=>setPaymentMethod(e.target.value)}/>
          <label htmlFor="check">Check payments</label>
        </div>
        
        <div>
          <input type="radio" name="payment" id="delivery" value="Cash on delivery" onChange={e=>setPaymentMethod(e.target.value)}/>
          <label htmlFor="delivery">Cash on delivery</label>
        </div>

        {/* border w-full */}

        <button className=' bg-orange-400 text-white rounded-full py-3 cursor-pointer transition-all duration-150 ease-in 
          hover:bg-orange-700 hover:bg-opacity-75' onClick={ handleSubmit(referToCompleted)}>
          {/* if select direct bank => refer to bank */}
            Place order
        </button>
      </div>
    </div>
  )
};

export default Checkout;