import React from 'react';
import FormField from './FormField';

function BillingDetailsForm({register, errors}) {
  return (
    <>
      <div className='flex items-center gap-3 self-start bg-slate-200 p-2 rounded-lg mt-16'>
        <span className=' bg-orange-400 px-4 py-2 rounded-full text-white'>1</span>
        <h2>Billing Details</h2>
      </div>
      <form method="get" className='self-center w-full flex flex-col gap-9'>
        <div className='flex gap-6'>
          <FormField id="firstName" label="Firstname" register={register} error={errors.firstName} />
          <FormField id="lastName" label="Lastname" register={register} error={errors.lastName}/>
        </div>

        <div className='flex gap-6'>
          <FormField id="phone" label="Phone" register={register} error={errors.phone}/>
          <FormField id="email" label="Email" register={register} error={errors.email}/>
        </div>

        <div className='flex gap-6'>
          <FormField id="country" label="Country" register={register} error={errors.country}/>
          <FormField id="town" label="Town / City" register={register} error={errors.town}/>
        </div>

        <div className='flex gap-6'>
          <FormField id="street" label="Street address" register={register} error={errors.street}/>
          <FormField id="zipCode" label="ZIP Code" register={register} error={errors.zipCode} />
        </div>

        {/* create account */}
        <div className=''>
          <input type="checkbox" id='register' className='mr-1.5'/>
          <label htmlFor="register" >create an acount?</label>
        </div>

        <div className='flex flex-col gap-3'>
          <label htmlFor="notes">Order notes (optional)</label>
          <textarea {...register('note')} id="notes" rows="10" placeholder='note about your order' className='rounded-3xl px-6 py-3 bg-transparent border border-gray-400'></textarea>
        </div>
      </form>
    </>
  )
}

export default BillingDetailsForm;