import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BannerStatic from '../components/Banner/BannerStatic'
import { useCheckoutStore } from '../store/store';

function CompletedOrder() {
  const {orders,paymentMethod, shippingAddress} = useCheckoutStore();
  const newOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  localStorage.removeItem('total-temp');
  localStorage.removeItem('discount')

  return (
    <div>
      <Header/>
      <BannerStatic/>
      <div className='container my-9 flex flex-col gap-9 justify-center'>
        <div className='text-emerald-700 text-center text-4xl py-6 px-9 rounded-lg border-2 border-dashed border-emerald-800'>
          Thank you. Your order has been recieved.
        </div>

        {newOrder && (
          <div className='self-center flex gap-6'>
          <div className='flex flex-col gap-6 border-r border-gray-400 pr-6 items-center'>
            <span className='text-gray-500 text-lg'>Order number:</span>
            <span>{newOrder.orderId}</span>
          </div>
          <div className='flex flex-col gap-6 border-r border-gray-400 pr-6 items-center'>
            <span className='text-gray-500 text-lg'>Date:</span>
            <span>{newOrder.date}</span>
          </div>
          <div className='flex flex-col gap-6 border-r border-gray-400 pr-6 items-center'>
            <span className='text-gray-500 text-lg'>Email:</span>
            <span>{shippingAddress.email}</span>
          </div>
          <div className='flex flex-col gap-6 border-r border-gray-400 pr-6 items-center'>
            <span className='text-gray-500 text-lg'>Total:</span>
            <span>{newOrder.total}</span>
          </div>
          <div className='flex flex-col gap-6 border-r border-gray-400 pr-6 items-center'>
            <span className='text-gray-500 text-lg'>Payment method:</span>
            <span>{paymentMethod}</span>
          </div>
        </div>
        )}

        {/* shipping address */}
        <div className='flex flex-col gap-3'>
          <h3 className='font-semibold text-3xl text-gray-700 my-6'>Shipping Address</h3>
          <span className='text-gray-500'>{shippingAddress.firstName} {shippingAddress.lastName}</span>
          <span className='text-gray-500'>{shippingAddress.streetAddress}</span>
          <span className='text-gray-500'>{shippingAddress.country}</span>
          <span className='text-gray-500'>{shippingAddress.city}</span>
          <span className='text-gray-500'>{shippingAddress.phone}</span>
          <span className='text-gray-500'>{shippingAddress.email}</span>
          <span className='text-gray-500'>{shippingAddress.zipCode}</span>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default CompletedOrder;