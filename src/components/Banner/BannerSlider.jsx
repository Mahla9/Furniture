import React, {useState, useEffect} from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
    { id: 1, image: "/images/slider1.jpeg", avatar: "/images/sliderauthor1.png", text: "Terracotta vase", artist: "Courtney Henry", price: "182", category: "decor", icon: "/images/decor.svg"},
    { id: 2, image: "/images/slider2.jpeg", avatar: "/images/sliderauthor2.png", text: "Upholstered chair", artist: "Esther Howard", price: "468", category: "chair", icon: "/images/chair.svg"},
    { id: 3, image: "/images/slider3.jpeg", avatar: "/images/sliderauthor3.png", text: "Sectional fabric sofa",artist: "Ramon Esteve", price: "3620", category: "sofas", icon: "/images/sofas.svg"},
  ];

function BannerSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    function nextSlide(){
      if(currentSlide===slides.length-1) setCurrentSlide(0)
      else setCurrentSlide(currentSlide+1)
    };
    function prevSlide(){
      if(currentSlide===0) setCurrentSlide(slides.length-1)
      else setCurrentSlide(currentSlide-1)
    }

    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 15000);
      return () => clearInterval(interval);
    }, []);


  // اگر کاربر دکمه قبلی فشار داد ترنسلیت ایکس بشه ولی اگ دکمه بعدی رو فشار داد ترنسلیت منفی ایکس بشه
  return (
    <div className='w-full h-[calc(100vh-350px)] sm:h-[calc(100vh-300px)] md:h-[calc(100vh-140px)] relative flex'>
      {slides.map((slide, index)=>(
        <div key={index} style={{ backgroundImage: `url(${slide.image})` , backgroundPosition:'center', backgroundSize:'cover' }} 
        className={`pl-14 lg:pl-28 absolute inset-0 bg-cover bg-no-repeat bg-center flex flex-col justify-around items-start transition-all ease-linear duration-500
        ${currentSlide===index ? "translate-x-0" : "-translate-x-full "}`}>
            <div className='flex gap-2 items-center text-gray-700 font-semibold'>
                <img src={slide.icon} alt={slide.category} className='p-4 rounded-full bg-black bg-opacity-10 aspect-square object-center'/>
                <h3>Discover more products 
                  <br /> 
                  in the <span className='underline decoration-orange-500 decoration-2 underline-offset-4'>{slide.category}</span> category
                </h3>
            </div>
            <div className=' font-bold'>
                <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-orange-500 md:text-gray-700'>
                  <h2>{slide.text} </h2> 
                  <div className='flex'>
                    by <img className='mx-3 w-[35px] sm:w-[40px] md:w-auto' src={slide.avatar} alt={slide.artist} /> {slide.artist}
                  </div>
                  
                </div>
                <div className='mt-4 flex gap-3 items-center group text-gray-700'>
                    <button type='button' className='bg-white text-xs md:text-xl px-2 md:px-3.5 py-1 md:py-2.5 rounded-3xl transition-all ease-in duration-150 group hover:bg-gray-200'>Shop Now</button>
                    <span className='text-lg md:text-2xl'>${slide.price}</span>
                </div>
            </div>
        </div>
      ))}

      {/* circle page */}
      <div className='absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-gray-100 px-2 py-1 rounded-xl'>
          {slides.map((_,index)=>(
            <span key={index} className={`w-2.5 h-2.5 rounded-full ${currentSlide===index ? "bg-gray-600" : "bg-gray-300"} cursor-pointer`} 
            onClick={()=>setCurrentSlide(index)}
            ></span>
          ))}   
      </div>
      <ChevronLeft className='absolute top-1/2 -translate-y-1/2 left-5 z-30 cursor-pointer' onClick={prevSlide}/>
      <ChevronRight className='absolute top-1/2 -translate-y-1/2 right-5 z-30 cursor-pointer' onClick={nextSlide}/>
    </div>
  )
}

export default BannerSlider;