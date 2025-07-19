import React from 'react';
import { useCartStore } from '../../store/store';
import CalculateTotal from './CalculateTotal';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

function SideCart() {
    // useShallow for best performance
    const { openCart, items, deleteFromCart, toggleSideCart } = useCartStore(useShallow(state=>({
        openCart: state.openCart,
        items: state.items,
        deleteFromCart: state.deleteFromCart,
        toggleSideCart: state.toggleSideCart
    })));

    const navigate = useNavigate();

  return (
    <>
        {/* overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${openCart ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={toggleSideCart}></div>

        {/* cart sidebar */}
        <div className={`fixed top-0 right-0 h-full w-64 sm:w-72 md:w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out ${openCart ? "translate-x-0" : "translate-x-full"}`}>
            {/* head */}
            <div className='flex justify-between items-center px-4 py-4 shadow-[0_4px_6px_-1px_rgba(203,213,225,0.5)]'>
                <h3 className='font-semibold text-gray-800'>Shopping cart</h3>
                <span className='cursor-pointer text-slate-400 text-sm transition-all duration-150 ease-in hover:text-orange-400' onClick={toggleSideCart}>x Close</span>
            </div>
            {/* main */}
            {items?.length>0?(
                <ul className='flex flex-col w-80 h-[calc(100vh-279px)] overflow-y-auto'>
                    {items.map(item=>(
                        <li key={item.productId} className='flex gap-2 items-center relative border-b'>
                            <div className='max-w-20 ml-5 mt-2'>
                                <img src={item.image} alt={item.title} className='w-full h-full'/>
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='text-sm'>{item.title}</h3>
                                <div>
                                    <span className='text-gray-400'>{item.quantity}x</span>
                                    <span className='text-orange-400 ml-2 font-semibold'>${item.price}</span>
                                </div>
                            </div>
                            <button type='button' className='absolute top-1 right-2 text-gray-500' onClick={()=>deleteFromCart(item.productId)}>x</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='flex flex-col gap-4 mx-5 w-64'>
                    <p className='font-semibold'>No products in the cart.</p>
                    <button className='bg-orange-400 text-white p-2 rounded-full' onClick={()=>navigate('/')}>Return To Shop</button>
                </div>
            )}
            {/* foot */}
            {items?.length>0 &&
            <div className='py-3 px-5 fixed bottom-0 inset-x-0 bg-white shadow-[0_-4px_6px_-1px_rgba(203,213,225,0.5)]'>
                <CalculateTotal toggleSideCart={toggleSideCart}/>
            </div>}
        </div>

    </>
  )
}

export default SideCart;