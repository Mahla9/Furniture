import React from 'react';
import { AlignJustify, LucideGrid3X3, Menu } from 'lucide-react';


function ProductControlls({setShowFilterbar, showFilterbar, indexOfFirst, indexOfLast, totalProducts, 
    productsPerPage,setProductsPerPage, setLayout,setCurrentPage, layout, sort, setSort}) {

    // Handlers
    const handleLayoutChange = (type) => {
        setLayout(type);
    };

    const handleProductsPerPageChange = (num) => {
        setProductsPerPage(num);
        setCurrentPage(1);
    };

  return (
    <div className='flex justify-between items-center'>
        <div className='flex lg:hidden items-center gap-3'>
            <Menu onClick={() => setShowFilterbar(!showFilterbar)} className='lg:hidden cursor-pointer size-9' />
            <span className='text-sm font-semibold text-slate-600'>Show Filterbar</span>
        </div>
        <div className='hidden lg:block text-xs'>
            Showing {indexOfFirst + 1}-{Math.min(indexOfLast, totalProducts)} of {totalProducts} results
        </div>

        <div className='flex items-center gap-3 '>
            <div className='hidden lg:flex items-center gap-2'>
            <span className='text-gray-800 text-xs xl:text-sm'>Show:</span>
            {[9, 12, 18, 24].map((num) => (
                <button
                key={num}
                className={`${productsPerPage === num ? "text-gray-800" : "text-gray-400"} transition`}
                onClick={() => handleProductsPerPageChange(num)}
                >
                {num}
                </button>
            ))}
            </div>

            <div className='hidden lg:flex gap-3 items-center'>
            <AlignJustify
                className={`cursor-pointer ${layout === "list" ? "text-gray-800" : "text-gray-400"}`}
                onClick={() => handleLayoutChange("list")}
            />
            <LucideGrid3X3
                className={`cursor-pointer ${layout === "grid-3" ? "text-gray-800" : "text-gray-400"}`}
                onClick={() => handleLayoutChange("grid-3")}
            />
            <span
                className={`cursor-pointer material-symbols-outlined ${layout === "grid-4" ? "text-gray-800" : "text-gray-400"}`}
                onClick={() => handleLayoutChange("grid-4")}
            >
                view_compact
            </span>
            </div>

            <select
            className='border rounded-full p-2 bg-transparent text-xs focus:outline-none'
            value={sort}
            onChange={(e)=>setSort(e.target.value)}
            >
            <option value="average">Sort by average rating</option>
            <option value="priceHigh">Sort by price: high to low</option>
            <option value="priceLow">Sort by price: low to high</option>
            </select>
        </div>
    </div>
  )
}

export default ProductControlls
