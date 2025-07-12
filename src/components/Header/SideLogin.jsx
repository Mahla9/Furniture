import React from 'react'
import { Link } from 'react-router-dom';
import { UserRound } from 'lucide-react';
import { useAuthForm } from '../Auth/useAuthForm';
import { Spin } from 'antd';

function SideLogin({setShowSideLogin, showSideLogin}) {
  const {errors,loading,register,handleSubmit, onSubmit} = useAuthForm("login");
  
  return (
      <div className={`fixed right-0 top-0 h-screen z-50 w-64 md:w-80 bg-white transition-all duration-200 ease-linear ${showSideLogin?"translate-x-0":"translate-x-full"}`}>
        {/* head */}
        <div className='flex justify-between items-center px-8 py-6'>
          <h3 className='text-gray-800 font-semibold'>Sign in</h3>
          <span onClick={()=>setShowSideLogin(false)} className='cursor-pointer transition-all duration-150 ease-in hover:text-orange-400'>x Close</span>
        </div>
        <div className='border border-slate-200'></div>
        {/* log in */}
        <div className=' px-4 py-6'>
          <form typeof='login' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <div className='flex flex-col'>
              <label htmlFor="email1" className='pl-3'>Email</label>
              <input type="email" id="email1" {...register('email')} className='border border-slate-200 rounded-full h-9 pl-4 focus:outline-none'/>
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>

            <div className='flex flex-col relative'>
              <label htmlFor="password" className='pl-3'>Password</label>
              <input type="password" id="password" {...register('password')} className='border border-slate-200 rounded-full h-9 pl-4 pr-2 focus:outline-none'/>
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>

            <button type='submit' className={`py-2 rounded-full text-white transition-all duration-150 ease-in ${loading?"disabled bg-orange-300":"bg-orange-400 hover:bg-orange-500"}`}> Log in {loading && <Spin/> }  </button>
          </form>
          
          <div className='flex items-center justify-between my-6'>
            <label htmlFor="remember" className='text-xs flex items-center'>
              <input type="checkbox" id="remember" className='mr-1'/> Remember me
            </label>
            <span className='text-orange-400 text-sm cursor-pointer'>Lost your password?</span>
          </div>
        </div>

        {/* crerate acount */}
        <div className='px-4 flex flex-col items-center gap-2'>
          <UserRound className='size-24 stroke-1 text-gray-300'/>
          <span>No acount yet?</span>
          <Link to='/auth/register' className='underline decoration-orange-400 underline-offset-2 text-gray-700'>Create an Acount</Link>
        </div>
      </div>
  )
}

export default SideLogin;