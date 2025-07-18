import React, { Suspense, lazy } from 'react';

const CategoriesSection = lazy(() => import('./CategoriesSection'));
const BestSellerWeek = lazy(() => import('./BestSellerWeek'));
const ShoppingByBrand = lazy(() => import('./ShoppingByBrand'));
const ProductCollection = lazy(() => import('./ProductCollection'));
const WeeklyCollection = lazy(() => import('./WeeklyCollection'));
const RulesFurniture = lazy(() => import('./RulesFurniture'));
const LatestArticles = lazy(() => import('./articles/LatestArticles'));
const AboutStore = lazy(() => import('./AboutStore'));

function Main() {
  return (
    <main className='container'>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoriesSection />
        <BestSellerWeek />
        <ShoppingByBrand />
        <ProductCollection />
        <WeeklyCollection />
        <RulesFurniture />
        <LatestArticles />
        <AboutStore />
      </Suspense>
    </main>
  );
}

export default Main;
