import React from 'react'
import CategoriesSection from './CategoriesSection'
import BestSellerWeek from './BestSellerWeek'
import ShoppingByBrand from './ShoppingByBrand'
import ProductCollection from './ProductCollection'
import WeeklyCollection from './WeeklyCollection'
import RulesFurniture from './RulesFurniture'
import LatestArticles from './articles/LatestArticles'
import AboutStore from './AboutStore'

function Main() {
  return (
    <main className='container'>
      <CategoriesSection/>
      <BestSellerWeek/>
      <ShoppingByBrand/>
      <ProductCollection/>
      <WeeklyCollection/>
      <RulesFurniture/>
      <LatestArticles/>
      <AboutStore/>
    </main>
  )
}

export default Main
