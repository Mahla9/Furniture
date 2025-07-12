import React from 'react'
import { useCheckoutStore } from '../store/store';

function ShippingAddressForm({shippingAddress, setShowEditForm}) {
  const setShippingAddress = useCheckoutStore(state=>state.setShippingAddress);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowEditForm(false);
    alert('changed successfully')
  }

  return (
    <form method="get" className='self-center w-full flex flex-col gap-9' onSubmit={handleSubmit}>
        <div className='flex gap-6'>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="first-name">First name</label>
            <input type="text" id='first-name' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={shippingAddress.firstName} onChange={(e)=> setShippingAddress("firstName",e.target.value)}/>
          </div>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="last-name">Last name</label>
            <input type="text" id='last-name' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={shippingAddress.lastName} onChange={(e)=>setShippingAddress("lastName", e.target.value)}/>
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="phone">Phone</label>
            <input type="tel" id='phone' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={shippingAddress.phone} onChange={(e)=>setShippingAddress("phone",e.target.value)}/>
          </div>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={shippingAddress.email} onChange={(e)=>setShippingAddress("email",e.target.value)}/>
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="country">Country / Region</label>
            <input type='text' id="country" className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none px-6' value={shippingAddress.country} onChange={e=>setShippingAddress("country", e.target.value)}/>
          </div>

          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="city">Town / City</label>
            <input type="text" id='city' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={shippingAddress.city} onChange={e=>setShippingAddress("city", e.target.value)}/>
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="street-address">Street address</label>
            <input type="text" id='street-address' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={shippingAddress.streetAddress} onChange={(e)=>setShippingAddress("streetAddress", e.target.value)}/>
          </div>
          <div className='basis-1/2 flex flex-col gap-1'>
            <label htmlFor="zip-code">ZIP Code</label>
            <input type="text" id='zip-code' className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6' value={shippingAddress.zipCode} onChange={(e)=>setShippingAddress("zipCode", e.target.value)}/>
          </div>
        </div>

        <button type='submit' className='px-6 py-3 rounded-lg bg-green-600'>Confirm</button>
        <button type="button" onClick={()=>setShowEditForm(false)} className='px-6 py-3 rounded-lg bg-amber-200'>cancel</button>
      </form>
  )
}

export default ShippingAddressForm;