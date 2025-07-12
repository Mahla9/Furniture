import { useQueryClient } from '@tanstack/react-query';
import { Heart, ChevronLeft, ChevronRight, Star, GitCompareArrows, Search,ShoppingCart } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useCartStore, useProductStore } from '../../store/store';
import useProductData from '../../hooks/useProductData';


function ProductsCarousel() {
    const queryClient = useQueryClient();
    const newCollection = useProductStore(state=>state.newProducts);
    const addToCart = useCartStore(state=>state.addToCart)

    const {isLoading, isError} = useProductData()

    const discountedPrice = (product)=> (product.price - (product.price * product.discount / 100));

    const scrollRef = useRef(null) // for connect to div element contain scroll-x
    const [start, setStart] = useState(true) // for left btn
    const [end, setEnd] = useState(false) // for right btn

    // function for move with button
    function scrollSmoothly(amount){
      scrollRef.current.scrollBy({left:amount, behavior:"smooth"})
    }

    // function for check buttons state
    const handleScroll=()=>{
        const element = scrollRef.current; //
        setStart(element.scrollLeft===0); // اگر اسکرول از چپ دقیقا صفر بشه یعنی ب ابتدای کار رسیدیم و دکمه قبل غیرفعال میشه
        setEnd(element.scrollLeft+element.offsetWidth >= element.scrollWidth-1) 
        // اگر جمع (تعداد پیکسلی ک از چپ اسکرول شده با تعداد پیکسل باقی مونده قابل نمایش در دید ما) بزرگتر یا
        //  برابر (عرض کل پیکسل المنت (حتی اونهایی ک از دید ما خارجن)) بشه یعنی به آخر عنصر رسیدیم و دکمه بعدی باید غیرفعال بشه
        // اون -1 برا جبران خطاهای ریز پیکسلی بعضی از مرورگرهاس که ممکنه هیچوقت باهم برابر نشه
    }

    useEffect(()=>{
        // فقط یه بار اجرا میشه:
        const element = scrollRef.current;
        element.addEventListener("scroll", handleScroll) // وقتی اسکرول شد، چک کن به ابتدا/انتها رسیدیم یا نه

        // شد اجرا میشه unmount فقط وقتی
        // یعنی وقتی کامپوننت حذف شد، مثلا به صفحه ی دیگه ای رفتیم یا این کامپوننت تحت شرطی حذف و ساخته بشه
        return ()=> element.removeEventListener("scroll",handleScroll)
    },[]);

      
  return (
    <div className='relative w-full mx-2 md:mx-0 md:max-w-lg lg:max-w-2xl xl:max-w-4xl group/carousel'>
      <ChevronLeft className={`absolute top-1/2 -translate-x-1/2 -left-3 cursor-pointer transition-opacity ease-in-out duration-200 md:opacity-0 group-hover/carousel:opacity-100 ${start?"text-gray-400 pointer-events-none" : "text-gray-800"}`} onClick={()=>scrollSmoothly(-300)}/>
      <ChevronRight className={`absolute top-1/2 -translate-x-1/2 -right-10 cursor-pointer transition-opacity ease-in-out duration-200 md:opacity-0 group-hover/carousel:opacity-100 ${end?"text-gray-400 pointer-events-none":"text-gray-800"}`} onClick={()=>scrollSmoothly(300)} />
      
      <div ref={scrollRef} className='flex gap-5 overflow-x-auto no-scrollbar shadow-xl shadow-gray-300'>   
      {newCollection?.length>0 && newCollection.map(product=>(
        <div key={product.productId} className='w-1/2 lg:w-1/3 shrink-0 bg-white relative flex flex-col rounded-lg shadow-lg shadow-gray-300 overflow-hidden group/card'>
            <Heart className='absolute top-2 right-2 text-gray-400 w-5' />
            {/* image card */}
            <div className='translate-y-3 transition-all duration-150 ease-in group-hover/card:translate-y-0 '>
              <img src={product.image} alt={product.title} className='aspect-square object-cover'/>
            </div>
            {/* info card */}
            <div className='flex flex-col gap-2 px-4 pb-3 translate-y-14 transition-all duration-150 ease-in group-hover/card:translate-y-0'>
              {/* name and category */}
              <div> 
                <div className='flex justify-between items-center'>
                  <h3 className='text-sm font-semibold text-gray-600'>{product.title}</h3>

                  {product.rating && 
                  <span className='flex items-center overflow-hidden text-xs font-semibold text-gray-700'>
                    {product.rating} <Star className='fill-yellow-400 text-yellow-400 size-5'/>
                  </span>}
                </div>

                <span className='text-sm text-gray-500'>{product.category}</span>
              </div>

              <div className='flex justify-between'>
                {/* price or discount */}
                  <div className='text-xs font-semibold'>
                    <span className={`${product.discount?"line-through text-gray-400 font-semibold":"text-orange-400 font-bold"}`}>${product.price.toFixed(2)}</span>
                    {product.discount && <span className='ml-2 text-orange-400 font-bold'>${discountedPrice(product)}</span>}
                  </div>    
                {/* colors select option */}
                {product.colors?.length>0 && (
                  <div className='flex gap-3'>
                  {product.colors.map((color, index)=>(
                    <span key={index} className="h-2.5 w-2.5 rounded-full cursor-pointer outline outline-1 outline-gray-400 outline-offset-[2.5px]" style={{backgroundColor: color.code}}></span>
                  ))}
                  </div>
                )}
              </div>

              {/* button */}
              <div className='flex gap-1 mt-4 justify-center items-center opacity-0 group-hover/card:opacity-100 '>
                <button type='button' className='w-full relative bg-orange-400 rounded-2xl px-4 h-8 text-white group/cart'
                    onClick={()=>addToCart(product)}>
                  <span className='absolute inset-0 text-nowrap text-sm leading-8 font-semibold transition-all duration-300 ease-in 
                      group-hover/cart:-translate-y-7 group-hover/cart:opacity-0'>
                      Add to cart
                  </span>
                  <span className='absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-in translate-y-7 opacity-0 
                    group-hover/cart:-translate-y-2.5 group-hover/cart:opacity-100'>
                      <ShoppingCart className='size-5'/>
                  </span>
                </button>

                <div className='hidden md:block relative group/compare group/tooltip'>
                  <GitCompareArrows className='text-gray-600 cursor-pointer stroke-1'/>
                  <div className='absolute opacity-0 group-hover/compare:opacity-100 text-xs text-nowrap -top-8 left-1/2 -translate-x-1/2 bg-gray-800 bg-opacity-95 rounded-md text-white px-3 py-1.5 transition-all duration-200 ease-in-out custom-point'>
                    Add to Compare
                  </div>
                </div>

                <div className='hidden md:block relative group/quickView'>
                  <Search className='text-gray-600 cursor-pointer stroke-1'/>
                  <div className='absolute opacity-0 group-hover/quickView:opacity-100 text-xs text-nowrap -top-8 -left-12 bg-gray-800 bg-opacity-95 rounded-md text-white px-3 py-1.5 transition-all duration-200 ease-in-out '>
                    Quick View
                  </div>
                </div>

              </div>
            </div>
        </div>
        ))}
        
        {/* مدیریت بارگذاری داده محصولات */}
        {isLoading && 
        <div className="flex justify-center w-8 h-8 border-2 border-indigo-300 rounded-full">
            <span className='w-[79%] h-full rounded-full animate-spin border-2 border-indigo-400 text-xs text-gray-300'>load</span>
        </div>}

        {/* مدیریت خطای دریافت داده محصولات */}
        {isError && 
        <div className="flex flex-col justify-center items-center h-56 text-red-500 text-sm">
            Error
            <button onClick={() => queryClient.invalidateQueries(['weekly-collection'])} className="mt-2 text-white bg-orange-400 rounded-lg"> Try Again</button>
        </div>}
      </div>
    </div>
    

       
    
  )
}

export default ProductsCarousel;