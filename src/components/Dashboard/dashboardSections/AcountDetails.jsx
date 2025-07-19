import React from 'react';
import { useAuth } from '../../../store/store';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function AcountDetails() {
  const changePassword = useAuth(state=>state.changePassword);
  const {register, formState:{errors}, reset, handleSubmit, watch} = useForm();

  const onSubmit = async (data) => {
    try {
      await changePassword(data.newPass);
      toast.success('Password changed successfully');
      reset();
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    }
  };
  
  return (
    <form className='md:ml-9 w-full bg-white px-6 py-3 my-6 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
      
      {/* add options : change password and email */}
      <div className='w-full md:w-2/3 lg:w-1/2 flex flex-col gap-6 rounded-xl'>
        <div className='flex flex-col'>
          <label htmlFor="new-pass" className='text-xs md:text-base ml-3'>NewPassword</label>
          <input {...register('newPass', {required: 'new password is required,  its should be contain big letter, small letted, atleast one number and one of !@#$%^&* char', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'})} type="text" id='new-pass' className='px-3 h-10 border border-gray-400 bg-transparent rounded-full'/>
          {errors.newPass && <p className='text-red-400'>{errors.newPass.message}</p>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor="confirm-newPass" className='text-xs md:text-base ml-3'>Confirm NewPassword</label>
          <input {...register('confirmNewPass', {required: 'confirm password is required', validate: (value)=> value === watch('newPass') || 'the passwoed don\'t match' })} type="text" id='confirm-newPass' className='px-3 h-10 border border-gray-400 bg-transparent rounded-full'/>
          {errors.confirmPass && <p className='text-red-400'>{errors.confirmNewPass.message}</p>}
        </div>
      </div>

      <button type="submit" className='py-3 px-6 mt-6 rounded-full text-white bg-orange-400 transition-all duration-150 ease-linear hover:bg-orange-500/80'>confirm</button>
    </form>
  )
}

export default AcountDetails;