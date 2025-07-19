import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import ArticleCard from '../components/Home/articles/ArticleCard';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useArticlesData from '../hooks/useArticlesData';

function Articles() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  const {isLoading, isError, articles} = useArticlesData();

  const totalPages = [Math.ceil(articles?.length / 8)];

  // محاسبه اینکه تو هر صفحه بیاد کدوم مقالاتو  بترتیب نشون بده
  const paginatedArticles = articles?.slice((currentPage-1*totalPages)-(currentPage*totalPages));

  return (
    <div className='container'>
      <Header/>

      {/* articles */}
      <div className='my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5' id='articles'>
      {paginatedArticles?.map(article=>(
        <ArticleCard key={article.id} article={article}/>
      ))}
      </div>

      {/* pages button */}
      <div className='my-10 flex justify-center items-center gap-2'>
      {Array.from({length:totalPages},(_,index)=>(
        <button key={index} className={`border-none h-8 w-8 ${currentPage === index+1 ? "bg-orange-400 text-white" : "text-gray-800 bg-transparent"} rounded-md w-2 h-2`} 
          onClick={()=>setCurrentPage(index+1)}
        >
          {index+1}
        </button>
      ))}
      </div>

      {isLoading && 
      <div className='flex justify-center items-center'>
        <div className='animate-spin bg-indigo-400 rounded-full size-6'></div>
      </div>
      }
      {isError && 
      <div>
        <button type='button' onClick={()=>queryClient.invalidateQueries(['articles'])} className="mt-2 text-white bg-orange-400 rounded-lg"> Try Again</button>
      </div>}
      <Footer/>
    </div>
  )
}

export default Articles;