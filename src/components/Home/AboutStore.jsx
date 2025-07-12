import React, { useState } from 'react'

function AboutStore() {
    const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className=' my-8'>
        <div className={`relative overflow-hidden ${isExpanded? "h-auto" : " max-h-52"}`}>
            <h3 className='text-gray-800 font-semibold text-lg mb-4'>Online store with a wide selection of furniture and decor</h3>
            <p className='text-gray-500'>
                Furniture is an invariable attribute of any room. It is they who give it the right atmosphere, making the space cozy and comfortable, 
                creating favorable conditions for productive work or helping to relax after a hard day. More and more often, customers want to place 
                an order in an online store, when you can sit down at the computer in your free time, arrange the furniture in the photo and calmly 
                buy the furniture you like. The online store has a large catalog of furniture: both home and office furniture are available.
            </p>
            <h3 className='text-gray-800 font-semibold text-lg mb-4'>Furniture production is a modern form of art</h3>
            <p className='text-gray-500'>
                Furniture manufacturers, as well as manufacturers of other home goods, are full of amazing offers: we often come across both standard
                mass-produced products and unique creations – furniture from professional craftsmen, which will be appreciated by true connoisseurs of beauty. 
                We have selected for you the best models from modern craftsmen who managed to ingeniously combine elegance, quality and practicality 
                in each product unit. Our assortment includes products from proven companies. Who for many years of continuous joint work did 
                not give reason to doubt their reliability and honesty. All of them guarantee the high quality of their products, excellent operational characteristics, 
                attractive appearance of the products, a long period of use of the furniture, as well as safety.
            </p>
             {/* سایه سفید فقط وقتی باز نیست */}
            {!isExpanded && (
            <div className='absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none' />
            )}
        </div>

        <button type='button' onClick={()=>setIsExpanded(!isExpanded)} aria-expanded={isExpanded} aria-label={isExpanded ? 'Show less content' : 'Show more content'}
        className={`mt-4 bg-transparent underline-offset-4 underline decoration-orange-400 transition-all duration-200 ease-in text-gray-800 hover:text-gray-400`}>
            {isExpanded?"show less" : "show more"}
        </button>
    </div>
  )
}

export default AboutStore;