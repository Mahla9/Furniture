import React from 'react';
import { useAuthForm } from './useAuthForm';
import { Spin } from 'antd';

function Register() {
    const {errors,loading,register,handleSubmit, onSubmit} = useAuthForm("register");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`w-full transition duration-200 ease-in flex flex-col gap-2.5 overflow-hidden `}>
        <h3 className='text-gray-800 font-semibold text-xl md:text-2xl'>Register</h3>
        <div className='flex flex-col'>
            <label htmlFor="usernamee" className='ml-1 mb-2 text-gray-700'>username</label>
            <input type="text" id="usernamee" className='h-9 rounded-full border px-3 focus:outline-none' {...register("username")}/>
            {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className='flex flex-col'>
            <label htmlFor="email0" className='ml-1 mb-2 text-gray-700'>Email</label>
            <input type="email" id="email0" className='h-9 rounded-full border px-3 focus:outline-none' {...register("email")}/>
            {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className='flex flex-col'>
            <label htmlFor="password0" className='ml-1 mb-2 text-gray-700'>password</label>
            <input type="text" id="password0" className='h-9 rounded-full border px-3 focus:outline-none ' {...register("password")}/>
            {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type='submit' className={`py-2 text-white rounded-full ${loading?"disabled bg-orange-400/60":"bg-orange-400 "}`}>
        Register {loading && <Spin size='small'/>} 
        </button>
    </form>
  )
}

export default Register
