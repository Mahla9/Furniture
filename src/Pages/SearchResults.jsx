import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BannerStatic from '../components/Banner/BannerStatic';
import { useSearchParams } from 'react-router-dom';
import useProductData from '../hooks/useProductData';
import useArticlesData from '../hooks/useArticlesData';
import ProductCard from '../components/Home/ProductCard';
import ArticleCard from '../components/Home/articles/ArticleCard'

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    const { products } = useProductData();
    const { articles } = useArticlesData();

    // اگه هنوز products یا query نیومدن، هیچی نزن
    if (!products || !articles || !query) {
        return <div className='text-center w-14 h-14 leading-[56px] animate-spin border-b border-r rounded-full border-orange-400 '></div>;
    }

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );
    const filteredArticles = articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <Header />
            <BannerStatic />
            <div className='container my-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-start'>
            {filteredProducts.map(product=>(
                <ProductCard key={product.productId} product={product} list="col"/>
            ))}
            {filteredArticles.map(article=>(
                <ArticleCard key={article.id} article={article}/>
            ))}
            </div>
            <Footer />
        </div>
    );
}

export default SearchResults;
