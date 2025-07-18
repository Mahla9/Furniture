import React, {useState} from 'react';
import { HashLink } from 'react-router-hash-link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MoveRight } from 'lucide-react';
import ArticleCard from './ArticleCard';
import axios from 'axios';

function LatestArticles() {
  const [refetching, setRefetching] = useState(false);
  const queryClient = useQueryClient()

  const {data: articles,isError, isLoading, refetch} = useQuery({
    queryKey:["articles"],
    queryFn:async ()=>{
      const res = await axios.get('/api-json/all-articles.json');
      return res.data
    }
  })
  const latestArticles = articles?.length>0 && articles.slice(-4)
  const handleError = async()=>{
    queryClient.invalidateQueries(['latest-article']);
    setRefetching(true)
    await refetch();
    setRefetching(false)
  }

  return (
    <div className='my-8'>
      {/* سربرگ سکشن */}
      <div className='flex justify-between items-center mb-10 text-gray-800'>
        <h3 className='font-semibold text-xl md:text-2xl lg:text-3xl'>Latest articles</h3>
        <HashLink smooth to="/articles#articles" className=' bg-white rounded-full flex items-center px-3 py-2 transition-all duration-150 ease-linear cursor-pointer hover:bg-gray-200'>
          visit the blog <MoveRight className='ml-1'/>
        </HashLink>
      </div>
      
      {/* نگهدارنده مقالات */}
      <div className='flex w-full gap-2 overflow-x-scroll no-scrollbar'>
      {latestArticles?.length>0 && latestArticles.map(article=>(
        <div key={article.id} className='w-1/2 shrink-0 md:w-1/3 lg:w-1/4'>
          <ArticleCard article={article}/>
        </div>
      ))}
      </div>

      {/* مدیریت بارگذاری داده */}
      {isLoading && 
      <div className='flex justify-center items-center'>
        <div className='animate-spin bg-indigo-400 rounded-full size-6'></div>
      </div>
      }
      {/* مدیریت خطاها */}
      {isError && 
      <div className='flex justify-center items-center'>
        <button type='button' onClick={handleError} className={`mt-2 text-white rounded-md px-4 py-3 flex gap-2 ${refetching?"bg-orange-300":" bg-orange-400"}`}>
          {refetching && <span className='w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full'></span>} 
          Try Again
        </button>
      </div>}
    </div>
  )
}

export default LatestArticles;