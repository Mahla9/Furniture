import React from 'react';
import { useAuth } from '../../store/store';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import BannerStatic from '../Banner/BannerStatic';
import Footer from '../Footer/Footer';

function ResetPassword() {
    const navigate = useNavigate();
    const changePassword = useAuth(state=>state.changePassword);
    const {register, formState:{errors}, reset, handleSubmit, watch} = useForm();

    const onSubmit = async (data) => {
        try {
            await changePassword(data.newPass);
            toast.success('Password changed successfully');
            reset();
            navigate('/');
        } catch (err) {
            toast.error(err.message || 'Failed to change password');
        }
    };
    return (
        <div>
            <Header/>
            <BannerStatic/>
            <form className='md:ml-9 mx-auto flex flex-col items-center px-6 py-3 my-9 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-6 rounded-xl bg-white p-6 w-96'>
                    <div className='flex flex-col'>
                    <label htmlFor="new-pass" className='pl-3'>NewPassword</label>
                    <input placeholder='example:123$%Am' {...register('newPass', {required: 'new password is required,  its should be contain big letter, small letted, atleast one number and one of !@#$%^&* char', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'})} type="text" id='new-pass' className='px-3 h-10 border border-gray-400 bg-transparent rounded-full'/>
                    {errors.newPass && <p className='text-red-400'>{errors.newPass.message}</p>}
                    </div>

                    <div className='flex flex-col'>
                    <label htmlFor="confirm-newPass" className='pl-3'>Confirm NewPassword</label>
                    <input placeholder='example:123$%Am' {...register('confirmNewPass', {required: 'confirm password is required', validate: (value)=> value === watch('newPass') || 'the passwoed don\'t match' })} type="text" id='confirm-newPass' className='px-3 h-10 border border-gray-400 bg-transparent rounded-full'/>
                    {errors.confirmPass && <p className='text-red-400'>{errors.confirmNewPass.message}</p>}
                    </div>
                </div>

                <button type="submit" className='py-3 px-6 mt-6 rounded-full text-white bg-orange-400 transition-all duration-150 ease-linear hover:bg-orange-500'>confirm</button>
            </form>
            <Footer/>
        </div>
    )
};

export default ResetPassword;