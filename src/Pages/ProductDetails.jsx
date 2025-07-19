import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Breadcrump from '../components/Banner/Breadcrump';
import { useParams } from 'react-router-dom';
import useProductData from '../hooks/useProductData';
import Brand from '../components/Brand';
import ProductOverview from '../components/ProductDetails/ProductOverview';


function ProductDetails() {
  const {productId} = useParams();
  const {products} = useProductData()
  
  const product = products?.find(p => p.productId.toString() === productId);
  
  return (
    <div>
      <Header/>
      <Breadcrump/>

      {/* Star Product Overview */}
      <div className='container bg-white rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-0 items-start'>
        <img src={product?.image} alt={product?.name} className='rounded-lg w-[80%]'/>
        {product && (
          <ProductOverview product={product} />
        )}
      </div>

      {/* Start Product Details */}
          <div className='container my-16 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg'>
            {/* Right or top section */}
            <div>
              <div>
                <h2 className='text-2xl font-semibold'>Product Details</h2>
                <p className='my-6 text-slate-500'>Made possible by exploring innovative molded plywood techniques, Iskos-Berlin’s Soft Edge Chair blends strong curves with extreme lightness to create a three-dimensionality not usually possible with 2-D plywood.</p>
              </div>
              <ul className='flex flex-col gap-3'>
                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Brand</span>
                  <span className='text-slate-600'>{product?.brand}</span>
                </li>

                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Collection</span>
                  <span className='text-slate-600'>{product?.title}</span>
                </li>

                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Color</span>
                  <span className='text-slate-600'>{product?.colors.length>0 ? product.colors.map(color => color.title).join(', ') : "Jet" }</span>
                </li>

                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Materials</span>
                  <span className='text-slate-600'> {product?.material} </span>
                </li>

                <li className='border-b border-slate-200 pb-3 flex justify-between items-center'>
                  <span>Warranty</span>
                  <span className='text-slate-600'>36 Month</span>
                </li>
              </ul>
            </div>

            {/* left or bottom section */}
            <div >
              <h2 className='text-2xl font-semibold mb-6'>Description</h2>
              <img src="/images/description-about-product.webp" alt="description about product" className='rounded-lg'/>
              <p className='my-6 text-slate-600'>The company reinterprets tradition by calling upon international designers to work with them and developing new technologies and materials to guarantee innovative and surprising results. Passion is the engine that drives the brand – together with its renowned creatives and high-profile collaborators – to search for original solutions using advanced materials, methods, tools, and technologies.</p>
              <ul className='list-disc list-inside text-slate-600 marker:text-orange-400'>
                <li>Choose items in a single color scheme and style</li>
                <li>Consider the area of the room</li>
                <li>Do not buy unnecessary pieces of furniture</li>
              </ul>
            </div>
          </div>

      <Brand brand={product?.brand} />
      
      <Footer/>
    </div>
  )
}

export default ProductDetails;