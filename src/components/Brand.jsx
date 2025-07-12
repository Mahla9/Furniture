import React from 'react';
import { Link } from 'react-router-dom';

function Brand({ brand }) {
    const categories = [
        {icon:"/icons-bottom-header/1-chairs.svg" , text: "Chairs"},
        {icon: "/icons-bottom-header/2-tables.svg", text:"Tables" },
        {icon:"/icons-bottom-header/3-sofas.svg" , text: "Sofas"},
        {icon: "/icons-bottom-header/8-lighting.svg" , text: "Lighting"},
    ];

    return (
    <div className='container my-9 grid lg:grid-cols-2 gap-6 py-6 px-6 rounded-lg bg-white'>
        <div>
            <h2 className='text-2xl font-semibold pb-3 pl-3'>About brand</h2>
            <img src="/images/brands/brands.jpg" alt="brands" className='rounded-lg w-full'/>
        </div>

        <div className='flex flex-col justify-center'>

            {/* Brand Name */}
            <div className='flex flex-col lg:flex-row justify-between gap-3 mt-6'>
                <h2 className='uppercase text-xl font-semibold md:text-xl lg:text-2xl'>{brand}</h2>
                <div className='flex justify-between gap-10 mb-8'>
                    <div className='flex gap-3 items-center'>
                        <h4 className='font-semibold md:text-base'>Share:</h4>
                        {/* sicials media icons */}
                        <div className='flex items-center'>
                            <img src="/images/social-network/icons8-instagram-32.png" alt="instagram" className='w-8 h-8'/>
                            <img src="/images/social-network/icons8-linkedin-32.png" alt="linkedin" className='w-8 h-8'/>
                            <img src="/images/social-network/icons8-x-32.png" alt="x" className='bg-black rounded-lg w-7 h-7'/>
                            <img src="/images/social-network/icons8-youtube-32.png" alt="youtube" className='w-8 h-8'/>
                        </div>
                    </div>
                    <Link to={`/`} className='bg-orange-400 px-6 py-2 rounded-full text-xs font-semibold text-white transition-all duration-150 ease-linear hover:bg-orange-500'>Contact Us</Link>
                </div>
            </div>

            <span className='mb-6 text-slate-600'>Sacramento / USA</span>

            <p className='text-slate-700'>
                The company reinterprets tradition by calling upon international designers to work with them and developing new technologies and materials to guarantee innovative and surprising results. Passion is the engine that drives the brand.
            </p>

            <div className='flex justify-around gap-3 my-9'>
                {categories.map(category => (
                <div key={category.text} className='flex flex-col items-center w-16 h-16'>
                    <img src={category.icon} alt={category.text} className='aspect-square w-full h-full bg-orange-200/40 rounded-full p-4'/>
                    <span className='text-sm font-semibold md:text-base'>{category.text}</span>
                </div>
                ))}
            </div>

            <p className='text-slate-700'>
                Nordic design inspires HAY's taste for clean lines, simple geometric shapes, and quality materials like wood, metal, and textiles. Anyway, you still use Lorem Ipsum and rightly so, as it will always have a place in the web workers toolbox.
            </p>
        </div>
    </div>
  )
}

export default Brand;