import React, {useState, useMemo} from 'react';
import Header from '../components/Header/Header';
import BannerStatic from '../components/Banner/BannerStatic';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/Home/ProductCard';
import Filterbar from '../components/FilterProd/Filterbar';
import AppliedFilters from '../components/FilterProd/AppliedFilters';
import useProductData from '../hooks/useProductData';
import { Spin } from 'antd';
import ProductControlls from '../components/Home/ProductControlls';

function Shop() {
    const {products} = useProductData();
    const {isError, isLoading: isProductLoading} = useProductData;

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


    // filter products
    const filteredProducts = useMemo(()=>{
        return products
        ?.filter(p => p.price >= appliedPrice[0] && p.price <= appliedPrice[1])
        .filter(p=> selectedBrands.length === 0 || selectedBrands.includes(p.brand))
        .filter(p=> selectedColors.length === 0 || p.colors.some( c=> selectedColors.includes(c.title) )) ;
    },[products, appliedPrice, selectedBrands, selectedColors]);

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
    return (
    <div>
        <Header filters={true} setShowFilterbar={setShowFilterbar}/>
        <BannerStatic/>
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
            <ProductControlls setShowFilterbar={setShowFilterbar} showFilterbar={showFilterbar} indexOfFirst={indexOfFirst} indexOfLast={indexOfLast} totalProducts={totalProducts}
        productsPerPage={productsPerPage} setProductsPerPage={setProductsPerPage} setLayout={setLayout} setCurrentPage={setCurrentPage} layout={layout} sort={sort} setSort={setSort} />

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
        <Footer/>
    </div>
  )
}

export default Shop;