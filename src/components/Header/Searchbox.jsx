import React, {useState, useEffect} from 'react';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useArticleStore, useProductStore } from '../../store/store';


function Searchbox() {
    const navigate = useNavigate();
    const articles = useArticleStore(state=>state.articles);
    const products = useProductStore(state=>state.products);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [debouncedQuery] = useDebounce(query, 1000);

    // for send query to other page (search results page)
    const handleSearch =(e)=>{
        if(e.key === "Enter"){
            if(query.trim()) navigate(`/search?query=${query}`);
            return;
        }
    };
    const handleSearchClick = () => {
        setResults([]);
        navigate(`/search?query=${query}`);
    };

        // for show results under serach box
    useEffect(()=>{
        // if user erase it query, the result erased.
        if (debouncedQuery.trim().length === 0 ) return setResults([]);

        const filteredProducts = products.filter(p=>p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) );
        const filteredArticles = articles.filter(a=>a.title.toLowerCase().includes(debouncedQuery.toLowerCase()) );

        const combined = [...filteredArticles.map(item=> ({...item, type: 'Article'})), 
            ...filteredProducts.map(item=>({...item, type: 'Product'}))
        ];
        return setResults(combined);

    }, [debouncedQuery, products, articles]);

    return (
    <div className='relative self-center bg-white lg:w-full border-[1px] py-[6px] rounded-2xl'>
        <input className='w-full rounded-2xl pl-8 placeholder:text-gray-500 focus:outline-none caret-gray-500' type="search" 
            placeholder='search for products' onChange={(e)=>setQuery(e.target.value)} onKeyDown={handleSearch}/>
        <span className=' absolute top-1/2 -translate-y-1/2 left-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </span>
        {results.length>0 && (
            <ul className={`absolute overflow-y-auto top-9 left-3 px-6 py-3 rounded-bl-lg rounded-br-lg bg-white z-50 shadow-lg shadow-slate-200`}>
            {results.map((result, index)=>(
                <li onClick={handleSearchClick} key={index} className='flex gap-6 justify-between items-center mb-3'>
                    <img src={result.image} alt={result.title} className='w-10 h-10 rounded-lg aspect-square'/>
                    <span className='text-gray-400 font-semibold text-xs truncate lg:text-sm'>{result.title}</span>
                    <span className='text-gray-300 text-xs lg:text-sm'>{result.type}</span>
                </li>
            ))}
        </ul>
        )}
    </div>
  )
}

export default Searchbox;