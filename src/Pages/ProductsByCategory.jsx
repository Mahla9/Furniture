import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BannerStatic from '../components/Banner/BannerStatic';
import {useProductStore} from '../store/store';
import ProductCard from '../components/Home/ProductCard';
import { useParams } from 'react-router-dom';
import { AlignJustify, LucideGrid3X3, Menu } from 'lucide-react';
import Filterbar from '../components/FilterProd/Filterbar';
import AppliedFilters from '../components/FilterProd/AppliedFilters';
import useProductData from '../hooks/useProductData';
import { Spin } from 'antd';

function ProductsByCategory() {
  const products = useProductStore(state=>state.products);
  const {isError, isLoading: isProductLoading} = useProductData;
  const { category } = useParams();

  const [showFilterbar, setShowFilterbar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [layout, setLayout] = useState("grid-3"); // grid-3, grid-4, list

  const [sort, setSort] = useState("average");
  const [priceRange, setPriceRange] = useState([0, 10000]); // temp
  const [appliedPrice, setAppliedPrice] = useState([0, 10000]); // permanent
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  // const [selectedMaterilas, setSelectedMaterilas] = useState([]);

  // Reset filter settings on category change
  useEffect(() => {
    setCurrentPage(1);
    setSort("average");
    setPriceRange([0, 10000]);
  }, [category]);

  // Then build memoized list
  const categoryProducts = useMemo(() => {
    return products?.filter(p => p.category === category);
  }, [category, products]);

  // filter products
  const filteredProducts = useMemo(()=>{
    return categoryProducts
    ?.filter(p => p.price >= appliedPrice[0] && p.price <= appliedPrice[1])
    .filter(p=> selectedBrands.length === 0 || selectedBrands.includes(p.brand))
    .filter(p=> selectedColors.length === 0 || p.colors.some( c=> selectedColors.includes(c.title) )) ;
  },[categoryProducts, appliedPrice, selectedBrands, selectedColors]);

  // sorted products by price
  const sortedProducts = useMemo(()=>{
    return filteredProducts && [...filteredProducts].sort((a,b)=>{
      if(sort === 'priceHigh') return b.price - a.price ;
      if(sort === 'priceLow') return a.price - b.price ;
      return 0; // average
    })
  },[filteredProducts, sort]);

  // Pagination
  const totalProducts = filteredProducts?.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProductsPerPage = sortedProducts?.slice(indexOfFirst, indexOfLast);

  // Handlers
  const handleLayoutChange = (type) => {
    setLayout(type);
  };

  const handleProductsPerPageChange = (num) => {
    setProductsPerPage(num);
    setCurrentPage(1);
  };

  return (
    <div>
      <Header />
      <BannerStatic />
      
      <div className={`container lg:flex lg:flex-row gap-9 my-16`}>
        {/* start Sidebar Filters */}
        <div className={`${showFilterbar ? "block fixed inset-0 bg-black/80 z-20" : "hidden"}`} onClick={() => setShowFilterbar(false)}></div>
        <div className={`lg:hidden fixed left-0 inset-y-0 ${showFilterbar ? "translate-x-0 z-20" : "-translate-x-full"}`}>
          <Filterbar 
            setSelectedBrands = {setSelectedBrands}
            setSelectedColors = {setSelectedColors}
            categoryProducts={sortedProducts} 
            setAppliedPrice={setAppliedPrice} 
            priceRange={priceRange}
            setPriceRange = {setPriceRange}
            setShowFilterbar={setShowFilterbar} 
            showFilterbar={showFilterbar} />
        </div>
        
        <div className='hidden lg:block' >
          <Filterbar 
            setSelectedBrands = {setSelectedBrands}
            setSelectedColors = {setSelectedColors}
            categoryProducts={sortedProducts} 
            setAppliedPrice={setAppliedPrice} 
            priceRange={priceRange}
            setPriceRange = {setPriceRange} />
        </div>
        {/* end sidebar filters */}

        {/* Main Content */}
        <div className='basis-4/5 flex flex-col gap-6'>
          {/* Top Controls */}
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <Menu onClick={() => setShowFilterbar(!showFilterbar)} className='lg:hidden cursor-pointer size-9' />
              <span className='text-sm font-semibold text-slate-600'>Show Filterbar</span>
            </div>
            <div className='hidden lg:block text-xs'>
              Showing {indexOfFirst + 1}-{Math.min(indexOfLast, totalProducts)} of {totalProducts} results
            </div>

            <div className='flex items-center gap-3 '>
              <div className='hidden lg:flex items-center gap-2'>
                <span className='text-gray-800 text-sm'>Show:</span>
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

          {/* Show Applied filters for best ux */}
          <AppliedFilters 
            setSelectedBrands = {setSelectedBrands}
            setSelectedColors = {setSelectedColors}
            selectedColors = {selectedColors}
            selectedBrands = {selectedBrands}
            minPrice = {appliedPrice[0]}
            maxPrice = {appliedPrice[1]}
            setAppliedPrice = {setAppliedPrice}
          />

          {/* Products List */}
          {sortedProducts?.length > 0 
          
          ? (
              <div>
                  <div className={`grid gap-6 mx-3 sm:mx-0 grid-cols-1 sm:grid-cols-2 ${ layout==="list" ? "lg:grid-cols-1" : layout === "grid-4" ? "lg:grid-cols-4" : layout === "grid-3" ? "lg:grid-cols-3" : "grid-cols-2"}`} >

                    {currentProductsPerPage.map(product => <ProductCard key={product.productId} product={product} list={layout === "list" ? "row" : "col"} /> )}
                  </div>

                  {/* Pagination */}
                  <div className='flex justify-center mt-9 gap-3'>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`rounded-lg px-4 py-2 ${currentPage === index + 1 ? "bg-orange-400 text-white" : "bg-white text-orange-400"}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
              </div>
          ) : (
            <div className='flex justify-center items-center'>No products found.</div>
          )}
        </div>

        {isProductLoading && <Spin fullscreen />}
        {isError && <div className='flex justify-center items-center'> Error, Try Again ... </div>}
      </div>

      <Footer />
    </div>
  );
}

export default ProductsByCategory;