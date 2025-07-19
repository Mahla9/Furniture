import React, {Suspense} from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BannerStatic from '../components/Banner/BannerStatic';
import { Link, useParams } from 'react-router-dom';
import { Spin } from 'antd';
const Login = React.lazy(() => import('../components/Auth/Login'));
const Register = React.lazy(() => import('../components/Auth/Register'));


function Auth() {
  const {section} = useParams();
  return (
    <div>
        <Header/>
        <BannerStatic/>
        {/* main */}
        <div  className='mx-auto w-[86%] xl:w-[66%] my-16 flex flex-col-reverse items-center justify-center md:flex-row-reverse md:items-start gap-9 md:gap-16'>
            <div className='flex flex-col justify-center items-center gap-3 basis-full md:basis-1/2'>
                <h2 className='text-gray-800 font-semibold text-xl md:text-2xl'>{section === 'login' ?"Login":"Register"}</h2>
                <p className='text-xs font-mono leading-5 text-gray-600'>Registering for this site allows you to access your order status and history. 
                  Just fill in the fields below, and we'll get a new account set up for you in 
                  no time. We will only ask you for information necessary to make the purchase 
                  process faster and easier.
                </p>
                <Link to={section==='login' ? '/auth/register' : '/auth/login'} className='bg-white mt-3 py-2 px-6 rounded-full transition-all ease-linear duration-150 hover:bg-slate-200'>
                  {section === 'register' ? 'Login' : 'Register'}
                </Link>
            </div>

            <div className='border-b w-full md:border-r md:w-2 md:h-72 border-gray-400 '></div>

            <div className=' w-full lg:basis-1/2 overflow-hidden h-auto'>
              <Suspense fallback={<Spin/>}>
                {section === 'login' ? <Login/> : <Register/>}
              </Suspense>

            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Auth;