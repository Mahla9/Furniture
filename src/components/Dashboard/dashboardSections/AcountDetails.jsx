import React from 'react';
import { useAuth } from '../../../store/store';
import { useForm } from 'react-hook-form';

function AcountDetails() {
  const user = useAuth(state=>state.user);
  const {register, formState:{errors}, reset, handleSubmit, watch} = useForm();

  const onSubmit = (data) => {
    if (data.currentPass === user.password){
      if (data.newPass !== data.confirmNewPass) return alert('password do not match');
      else {
        alert('success process')
        reset();
        return;
      }
    }
    else alert('current password is false')
  }
  
  return (
    <form className='md:ml-9 max-w-72 bg-white px-6 py-3 my-6 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
      
      {/* add options : change password and email */}

      <div className='flex flex-col gap-6 rounded-xl'>
        <div className='flex flex-col'>
          <label htmlFor="current-pass">Current Password</label>
          <input {...register('currentPass', {required: 'current password is required'})} type="text" id='current-pass' className='px-3 h-10 border border-gray-400 bg-transparent rounded-full'/>
          {errors.currentPass && <p className='text-red-400'>{errors.currentPass.message}</p>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor="new-pass">NewPassword</label>
          <input {...register('newPass', {required: 'new password is required,  its should be contain big letter, small letted, atleast one number and one of !@#$%^&* char', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'})} type="text" id='new-pass' className='px-3 h-10 border border-gray-400 bg-transparent rounded-full'/>
          {errors.newPass && <p className='text-red-400'>{errors.newPass.message}</p>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor="confirm-newPass">Confirm NewPassword</label>
          <input {...register('confirmNewPass', {required: 'confirm password is required', validate: (value)=> value === watch('newPass') || 'the passwoed don\'t match' })} type="text" id='confirm-newPass' className='px-3 h-10 border border-gray-400 bg-transparent rounded-full'/>
          {errors.confirmPass && <p className='text-red-400'>{errors.confirmNewPass.message}</p>}
        </div>
      </div>

      <button type="submit" className='py-3 px-6 mt-6 rounded-lg text-white bg-orange-400 transition-all duration-150 ease-linear hover:bg-orange-500/80'>confirm</button>
    </form>
  )
}

export default AcountDetails;