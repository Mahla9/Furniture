import React from 'react';

function CartItems({items}) {
  return (
    <ul className='flex flex-col overflow-y-auto '>
        {items.map(item=>(
            <li key={item.productId} className='flex gap-2 items-center justify-between relative last:border-b-0 border-b mb-6 pb-6'>
                <div className='flex gap-6 items-center'>
                    <div className='max-w-20 ml-5'>
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h3>{item.title}</h3>
                        <div className='flex border rounded-full overflow-hidden'>
                            <span onClick={()=>addQuantityItem(item.productId)} className='text-center leading-5 px-2 cursor-pointer transition-all duration-200 ease-in text-gray-700 hover:bg-orange-400 hover:text-white'>-</span>
                            <span className='border-r border-l px-3 text-gray-700'>{item.quantity}</span>
                            <span onClick={()=>reduceQuantityItem(item.productId)} className='text-center leading-5 px-2 cursor-pointer transition-all duration-200 ease-in text-gray-700 hover:bg-orange-400 hover:text-white'>+</span>
                        </div>
                    </div>
                </div>
                <div className='text-gray-700'>${item.price}</div>
                <button type='button' className='absolute top-100 left-1 text-gray-600 cursor-pointer transition-all duration-200 ease-in hover:text-gray-400' onClick={()=>deleteFromCart(item.productId)}>x</button>
            </li>
        ))}
    </ul>
  )
}

export default CartItems;