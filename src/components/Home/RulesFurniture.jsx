import { Play, SidebarClose } from 'lucide-react';
import React from 'react'
import { useState } from 'react'

function RulesFurniture() {
    const [openVideo, setOpenVideo] = useState(false)

  return (
    <div className='grid grid-cols-1 md:grid-cols-5 gap-6 relative'>
        <div className='md:col-span-2'>
            <h2 className='text-xl sm:text-3xl font-semibold'>Rules for choosing furniture</h2>
            <img src="/images/rules-furniture.png" alt="rules-furniture" className='w-full'/>
        </div>
        <div className='md:col-span-3 flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
                <h3 className='text-gray-900 font-semibold text-lg'>Whether living on your own or with a family, your living room is an important space.</h3>
                <p className='text-gray-600 '>This room is where your family spends time together, and it is the room most of your guests
                    will spend the majority of their time in. Choosing furniture that creates a pleasant, 
                    welcoming appearance while holding up against the wear and tear of everyday life is the key
                    in getting this space to work for your needs.
                </p>
                <ul className='text-gray-600 list-inside list-disc marker:text-orange-400 marker:text-lg'>
                    <li>Choose items in a single color scheme and style</li>
                    <li>Consider the area of the room</li>
                    <li>Do not buy unnecessary pieces of furniture</li>
                </ul>
            </div>
            <div className='relative rounded-full overflow-hidden'>
                <img loading='lazy' src="/images/rules-video-poster.webp" alt="rules-video-poster" className='w-full h-full'/>
                <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center'>
                    <span className='text-gray-200 mb-7'>How choose furniture</span>
                    <h2 className='text-base sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-100 text-nowrap mb-7'>SØLREM furniture collection</h2>
                    <div className='cursor-pointer inline-block p-2 border border-gray-100 rounded-full group/play' onClick={()=>setOpenVideo(true)}>
                        <Play className='text-white transition-all duration-200 ease-in-out group-hover/play:text-opacity-80 group-hover/play:scale-75'/>
                    </div>
                </div>
            </div>
        </div>
        {openVideo && 
        <div className='absolute inset-0 w-screen flex items-center justify-center'>
            <button type='button' className='relative top-[50%] right-[30%] text-white text-2xl' onClick={()=>setOpenVideo(false)}><SidebarClose/></button>
            <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/XHOmBV4js_E?si=wPFxWk2OEAZ7q8T_" 
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
            web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
        </div>
        }
    </div>
  )
}

export default RulesFurniture;