import React from 'react';
import {useAuthForm} from './useAuthForm';

function Login({section}) {
    const {errors,loading,register,handleSubmit, onSubmit} = useAuthForm("login");
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`w-full transition duration-300 ease-in flex flex-col gap-2.5 ${section === 'login' ?" h-auto pointer-events-auto":"overflow-hidden h-0 pointer-events-none"}`}>
            <h3 className='text-gray-800 font-semibold text-xl md:text-2xl'>Login</h3>

            <div className='flex flex-col'>
                <label htmlFor="email" className='ml-1 mb-2 text-gray-700'>Email</label>
                <input type="email" id="email" className='h-9 rounded-full border px-3 focus:outline-none' {...register("email")}/>
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>

            <div className='flex flex-col'>
                <label htmlFor="passwordd" className='ml-1 mb-2 text-gray-700'>Password</label>
                <input type="text" id="passwordd"  className='h-9 rounded-full border px-3 focus:outline-none' {...register("password")}/>
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>

            <button type="submit" className={`py-2 rounded-full text-white rounded-ful ${loading?"disabled bg-orange-300":"bg-orange-400 "}`}>
                Log in
            </button>
        </form>
    )
}

export default Login;