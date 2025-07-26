import { FilePenLine } from 'lucide-react'
import React, { useState } from 'react';
import ShippingAddressForm from '../../ShippingAddressForm';
import {useCheckoutStore} from '../../../store/store'

function Addresses() {
  const [showEditForm, setShowEditForm] = useState(false);
  const shippingAddress = useCheckoutStore(state=>state.shippingAddress);

  return (
    <div>
      {/* recieve adresses from success checkout */}
      <h3>The following addresses will be used on the checkout page by default.</h3>
      <div className='flex gap-3 my-6 cursor-pointer' onClick={()=>setShowEditForm(true)}>
        <FilePenLine/>
        <span>Edit Shipping address</span>
      </div>
      {showEditForm?(
        <ShippingAddressForm setShowEditForm={setShowEditForm} shippingAddress={shippingAddress}/>
      ) : (
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
      )}

      {!shippingAddress && <span>no exist address yet</span>}
    </div>
  )
}

export default Addresses;