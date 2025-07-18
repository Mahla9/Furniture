import { useQueryClient } from '@tanstack/react-query';
import { Heart, ChevronLeft, ChevronRight, Star, GitCompareArrows, Search,ShoppingCart } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useProductStore } from '../../store/store';
import useProductData from '../../hooks/useProductData';
import ProductCard from './ProductCard';


function ProductsCarousel() {
    const queryClient = useQueryClient();
    const newCollection = useProductStore(state=>state.newProducts);

    const {isLoading, isError} = useProductData()

    const scrollRef = useRef(null) // for connect to div element contain scroll-x
    const [start, setStart] = useState(true) // for left btn
    const [end, setEnd] = useState(false) // for right btn

    // function for move with button
    const scrollSmoothly = useCallback((amount)=>{
      scrollRef.current.scrollBy({left:amount, behavior:"smooth"})
    },[scrollRef])

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
    <div className='w-full mx-2 md:mx-0 md:max-w-lg lg:max-w-2xl xl:max-w-4xl group/carousel'>
      <ChevronLeft className={`absolute top-1/2 -translate-x-1/2 -left-3 cursor-pointer transition-opacity ease-in-out duration-200 md:opacity-0 group-hover/carousel:opacity-100 ${start?"text-gray-400 pointer-events-none" : "text-gray-800"}`} onClick={()=>scrollSmoothly(-300)}/>
      <ChevronRight className={`absolute top-1/2 -translate-x-1/2 -right-10 cursor-pointer transition-opacity ease-in-out duration-200 md:opacity-0 group-hover/carousel:opacity-100 ${end?"text-gray-400 pointer-events-none":"text-gray-800"}`} onClick={()=>scrollSmoothly(300)} />
      
      <div ref={scrollRef} className='flex gap-5 overflow-x-auto no-scrollbar shadow-xl shadow-gray-300'>   
        {newCollection?.length>0 && newCollection.map(product=>(
          <ProductCard key={product.productId} product={product} list="col" carousel={true}/>
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