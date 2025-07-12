import { Facebook, Linkedin, MessageSquare, Share2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';



function ArticleCard({article}) {

    const date = new Date(article.createdAt)
    const formattedDate = new Intl.DateTimeFormat("en-US",{
        day: "2-digit",
        month:"short",
        year: "numeric",
    }).format(date)

  return (
    <article className='rounded-lg overflow-hidden group/card'>
      <div className='relative overflow-hidden'>
        <img src={article.image} alt={article.title} className='h-full w-full transition-all duration-500 ease-out group-hover/card:scale-110'/>

        <div className='absolute bottom-2 inset-x-0 flex justify-around items-center'>
          <div className='flex items-center justify-center'>
            <img src={article.avatar} alt={article.authorName} className='rounded-full w-7'/>
            <span className='text-white ml-1'>{article.authorName}</span>
          </div>
          <div className='flex items-center gap-3 '>
            <div className='relative group/share'>
              <Share2 className='text-white'/>
              <div className='absolute -top-8 left-1/2 -translate-x-1/2 flex gap-3 items-center text-white bg-gray-800 bg-opacity-85 p-1 rounded-md opacity-0 transition-all duration-200 ease-in group-hover/share:opacity-100'>
                <Facebook className='fill-white stroke-0 size-5 transition-all duration-200 ease-in hover:scale-75 cursor-pointer'/>
                <div>
                  <Linkedin className='fill-white stroke-0 size-5 transition-all duration-200 ease-in hover:scale-75 cursor-pointer'/>
                  {/* link for refer to linkedin */}
                </div>
                </div>
            </div>
            <div className='relative cursor-pointer' >
              <MessageSquare className='text-white'/>
              <span className='h-4 w-4 text-center leading-4 text-xs rounded-full absolute -top-1 -right-1 bg-orange-400 text-white'>0</span>
              {/* <Link to={`/articles/${article.id}#comment`}/> */}
            </div>
          </div>
        </div>
      </div>

      <div className='p-5 bg-white'>
        <div className='text-gray-500'>{article.subject} / {formattedDate}</div>
        <h3 className='text-gray-800'>{article.title}</h3>
        <p className='text-gray-600 line-clamp-2'>{article.summary}</p>
        <div className='inline-block text-orange-400 cursor-pointer transition-all duration-200 ease-in hover:text-orange-300'>
          Continue reading
          {/* <Link to={`/articles/${article.id}`}/> */}
        </div>
      </div>
    </article>
  )
}

export default ArticleCard;