import { useState, useMemo } from 'react';
import useProductData from '../../hooks/useProductData'
import ProductCard from './ProductCard';
import { useProductStore } from '../../store/store';

function BestSellerWeek() {
  const [active,setActive] = useState("all");
  const list = "col";

  const {isLoading, isError} = useProductData()

  const products = useProductStore(state=>state.bestSeller);

  const filteredProducts = useMemo(() => {
  if (!products) return [];
  return active === 'all' ? products : products.filter(p => p.category.toLowerCase() === active);
}, [products, active]);

  
  return (
    <div className='flex flex-col my-20'>
      <div className='flex items-center flex-col md:flex-row justify-between my-10'>
        <h2 className='font-bold text-2xl'>Best Seller Week</h2>
        <ul className='flex gap-3 md:gap-6 group'>
          <li className={`text-xs md:text-sm lg:text-base cursor-pointer transition-all ease-linear duration-150 hover:underline hover:decoration-orange-500 underline-offset-4 decoration-2 ${active === "all" ? "underline decoration-orange-600" : "no-underline"}`} onClick={()=>setActive("all")}>All</li>
          <li className={`text-xs md:text-sm lg:text-base cursor-pointer transition-all ease-linear duration-150 hover:underline hover:decoration-orange-500 underline-offset-4 decoration-2 ${active === "chairs" ? "underline" : "no-underline"}`} onClick={()=>setActive("chairs")}>Chairs</li>
          <li className={`text-xs md:text-sm lg:text-base cursor-pointer transition-all ease-linear duration-150 hover:underline hover:decoration-orange-500 underline-offset-4 decoration-2 ${active === "armchairs" ? "underline" : "no-underline"}`} onClick={()=>setActive("armchairs")}>Armchairs</li>
          <li className={`text-xs md:text-sm lg:text-base cursor-pointer transition-all ease-linear duration-150 hover:underline hover:decoration-orange-500 underline-offset-4 decoration-2 ${active === "sofas" ? "underline" : "no-underline"}`} onClick={()=>setActive("sofas")}>Sofas</li>
          <li className={`text-xs md:text-sm lg:text-base cursor-pointer transition-all ease-linear duration-150 hover:underline hover:decoration-orange-500 underline-offset-4 decoration-2 ${active === "tables" ? "underline" : "no-underline"}`} onClick={()=>setActive("tables")}>Tables</li>
        </ul>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {/* مدیریت بارگذاری داده محصولات */}
        {isLoading && <div className="flex flex-col justify-center items-center animate-spin border-2 rounded-full"></div>}
        {isError && <p>Error </p>}
        {filteredProducts.slice(0,10).map(product=>(
          <ProductCard key={product.productId} product={product} list={list}/>
        ))}
      </div>
    </div>
  )
}

export default BestSellerWeek;