import React from 'react'
import { useCheckoutStore } from '../../store/store'

function PaymentMethods({paymentError}) {
    const setPaymentMethod = useCheckoutStore(state=>state.setPaymentMethod);

    return (
    <>
      <div className='flex items-center gap-3 self-start bg-slate-200 p-2 rounded-lg mt-16'>
        <span className='bg-orange-400 px-4 py-2 rounded-full text-white'>3</span>
        <h2>Payment Information</h2>
      </div>
      {/* step 3 => radio button for payment information */}
      <div className='flex flex-col gap-9'>
        <div>
          <input type="radio" name="payment" id="bank" value="Direct bank transfer" onChange={e=>setPaymentMethod(e.target.value)} />
          <label htmlFor="bank">Direct bank transfer</label>
          {/* info about this payment and style h-auto or h-0 */}
        </div>

        <div>
          <input type="radio" name="payment" id="check" value="Check payments" onChange={e=>setPaymentMethod(e.target.value)} />
          <label htmlFor="check">Check payments</label>
        </div>
        
        <div>
          <input type="radio" name="payment" id="delivery" value="Cash on delivery" onChange={e=>setPaymentMethod(e.target.value)} />
          <label htmlFor="delivery">Cash on delivery</label>
        </div>

        {paymentError && <div className='text-red-400'>{paymentError}</div>}
      </div>
    </>
  )
}

export default PaymentMethods
