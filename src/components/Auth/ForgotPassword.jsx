import React, { useState } from 'react';
import { useAuth } from '../../store/store';
import { toast } from 'react-toastify';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BannerStatic from '../Banner/BannerStatic';

function ForgotPassword() {
    const forgotPassword = useAuth((state) => state.forgotPassword);
    const [email, setEmail] = useState('')

     const handleResetpassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(error.message || 'Failed to send email');
    }
  };

    return (
        <div>
            <Header/>
            <BannerStatic/>
            <div className='flex mx-auto w-[90%] md:w-[60%] lg:w-[40%] flex-col items-center justify-center my-12'>
                <p className='text-slate-500 border-b pb-6'>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
                <form onSubmit={handleResetpassword} className='w-full flex flex-col mt-6'>
                    <div className='flex w-full flex-col gap-1'>
                        <label htmlFor="forgot-pass" className='ml-3 text-slate-700'>Email:</label>
                        <input type="email" id='forgot-pass' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='example@gmail.com' className='h-9 w-full rounded-full px-3 placeholder-shown:text-sm'/>
                    </div>

                    <button type="submit" className='bg-orange-400 px-3 py-2 mt-6 text-white text-sm font-semibold rounded-full transition-all duration-200 ease-linear hover:bg-orange-500'>Send Reset Link</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
};

export default ForgotPassword;