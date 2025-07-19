import AnimatedDot from './AnimatedDot';
import React, {useState} from 'react';

const dots = [
    [{top:"34%", left:"64%", productId:"1"},{top:"78%", left:"23%", productId:"20"},{top:"90%", left:"85%", productId:"3"}],
    [{top:"61%", left:"28%", productId:"13"},{top:"52%", left:"70%", productId:"2"},{top:"85%", left:"60%", productId:"14"}],

    [{top:"60%", left:"43%", productId:"6"},{top:"69%", left:"63%", productId:"5"},{top:"45%", left:"83%", productId:"4"}],
    [{top:"71%", left:"20%", productId:"8"},{top:"50%", left:"79%", productId:"7"},{top:"52%", left:"10%", productId:"9"}],

    [{top:"60%", left:"70%", productId:"16"},{top:"70%", left:"39%", productId:"17"},{top:"21%", left:"40%", productId:"15"}],
    [{top:"30%", left:"30%", productId:"18"},{top:"80%", left:"90%", productId:"12"},{top:"80%", left:"50%", productId:"19"}],
    
    [{top:"10%", left:"50%", productId:"10"},{top:"70%", left:"40%", productId:""},{top: "76%", left: "73%", productId:"11"}],
    [{top:"50%", left:"80%", productId:"23"},{top:"80%", left:"33%", productId:"21"},{top:"80%", left:"73%", productId:"22"}],
];

function ProductCollection() {
    // فقط یک state برای نگهداری نقطه فعال و مختصات آن
    const [activePing, setActivePing] = useState(null);

    // فقط زمانی که activePing مقدار دارد، مدال نمایش داده شود
    return (
    <div className='flex flex-col mt-16'>
        <div className='flex flex-col items-center mb-5'>
            <h2 className='text-gray-800 text-3xl'>Product collections</h2>
            <p className='text-gray-500'>Explore product collections from our vendors</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-4 xl:grid-cols-5 ">
            <div className='flex flex-col items-center'>
                <div className='rounded-xl mb-5 w-full relative'>
                    <img loading='lazy' src="/images/collection/1.webp" alt="" className='w-full object-contain rounded-xl'/>
                    <AnimatedDot dots={dots[0]} setActivePing={setActivePing} activePing={activePing}/>
                </div>
                <div className='rounded-xl mb-5 w-full relative'>
                    <img src="/images/collection/6.webp" alt="" className='w-full object-contain rounded-xl'/>
                    <AnimatedDot dots={dots[1]} setActivePing={setActivePing} activePing={activePing}/>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div className='rounded-xl mb-5 w-full relative'>
                    <img src="/images/collection/2.webp" alt="" className='w-full object-contain rounded-xl'/>
                    <AnimatedDot dots={dots[2]} setActivePing={setActivePing} activePing={activePing}/>
                </div>
                
                <div className="bg-[#e1dbd4] py-7 px-6 rounded-xl">
                    <h2 className='text-4xl text-gray-800'>GLADØM</h2>
                    <p className='text-lg text-gray-500'>The new common language will be more simple and
                        regular than the existing languages</p>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div className='rounded-xl mb-5 mt-5 sm:mt-0 relative'>
                    <video autoPlay muted loop width="100%" className='rounded-xl'>
                        <source src="/images/collection/3.mp4" type="video/mp4"/>
                    </video>
                    <AnimatedDot dots={dots[3]} setActivePing={setActivePing} activePing={activePing}/>
                </div>
                <div className='rounded-xl mb-5 w-full relative'>
                    <img src="/images/collection/8.webp" alt="" className='w-full object-cover rounded-xl'/>
                    <AnimatedDot dots={dots[4]} setActivePing={setActivePing} activePing={activePing}/>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div className="bg-[#cad3d2] py-7 px-6 mb-5 rounded-xl">
                    <h2 className='text-4xl text-gray-800'>HÄLLAN</h2>
                    <p className='text-lg text-gray-500'>The new common language will be more simple and
                        regular than the existing languages</p>
                </div>
                <div className='rounded-xl mb-5 w-full relative'>
                    <img src="/images/collection/9.webp" alt="" className='w-full object-contain rounded-xl'/>
                    <AnimatedDot dots={dots[5]} setActivePing={setActivePing} activePing={activePing}/>
                </div>
            </div>
            
            <div className="hidden xl:block">
                <div className='rounded-xl mb-5 relative'>
                    <img src="/images/collection/5.webp" alt="" className='w-full object-contain rounded-xl'/>
                    <AnimatedDot dots={dots[6]} setActivePing={setActivePing} activePing={activePing}/>
                </div>
                <div className='rounded-xl mb-5 relative'>
                    <img src="/images/collection/10.webp" alt="" className='w-full object-contain rounded-xl'/>
                    <AnimatedDot dots={dots[7]} setActivePing={setActivePing} activePing={activePing}/>
                </div>
            </div>
        </div>
    </div>
  )
};

export default ProductCollection;