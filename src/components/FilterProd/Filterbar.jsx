import React, { useMemo } from 'react';
import Slider from '@mui/material/Slider';
import { Search } from 'lucide-react';

function Filterbar({categoryProducts,setSelectedBrands, setSelectedColors, priceRange, setPriceRange, setAppliedPrice, setShowFilterbar, showFilterbar}) {

  const uniqueBrands = useMemo(()=> {
    return [...new Set(categoryProducts?.map(p=>p.brand))]
  } ,[categoryProducts]);

  const counterBrand = useMemo(()=>{
    const sumBrand = {} ;
    categoryProducts?.forEach(p=>(
      sumBrand[p.brand] = ( sumBrand[p.brand] || 0 ) + 1 
    )) ;
    return sumBrand
  }, [categoryProducts]) ;

  const uniqueColors = useMemo(()=> {
    const allColors = categoryProducts?.flatMap(p=>p.colors || [] ) ;
    const unique = [...new Map(allColors?.map(color => [color.title, color])).values()] ;
    return unique ;
  } ,[categoryProducts])

  const counterColor = useMemo(()=>{
    const sumColor = {} ;
    categoryProducts?.forEach(p => p.colors?.forEach(c=> sumColor[c.title] = (sumColor[c.title] || 0) +1 ) ) ;
    return sumColor;
  }, [categoryProducts]) ;

  return (
    <div className={`basis-1/5 lg:ml-3 py-4 px-6 w-72 lg:w-60 xl:w-72 bg-white rounded shadow-md h-screen lg:h-auto flex flex-col gap-9 overflow-y-auto`}>

        {showFilterbar && <span className='text-slate-500 border-b pb-3 cursor-pointer' onClick={() => setShowFilterbar(false)}>X close </span>}
        {/* filter by price */}
        <div className='flex flex-col gap-3'>
          <h3 className="font-semibold mb-4">Filter By Price</h3>
          <Slider
            value={priceRange}
            onChange={(e, newValue)=>setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            sx={{
              color: '#ff8c42',
              '& .MuiSlider-thumb': {
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: '0px 0px 0px 8px rgba(255,140,66,0.16)'
                }
              }
            }}
          />
          <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
            <span>
              <span>Price: </span>
              <span className='text-slate-800 text-sm font-semibold'>{priceRange[0]} - {priceRange[1]}</span>
            </span>
            <button type="button" className='bg-slate-100 font-semibold text-xs px-3 py-1 rounded-full transition-all duration-200 ease-in hover:bg-slate-200' onClick={()=>setAppliedPrice(priceRange)}>Filter</button>
          </div>
        </div>

        {/* filter by brand */}
        <div className='flex flex-col gap-3 border-t border-slate-300'>
          <h3 className="mt-4 text-xs lg:text-sm">Filter by Brand</h3>
          {/* search by brand */}
          <div className='relative w-full h-9'>
            <input type="search" id="" className='h-full w-full rounded-full border px-3 placeholder:text-xs' placeholder='Find a Brand'/>
            <Search className='absolute top-1/2 -translate-y-1/2 right-2 size-5 text-slate-400'/>
          </div>
          <ul className='max-h-52 flex flex-col gap-3'>
            {uniqueBrands.map(brand=>(
              <li key={brand} className='flex justify-between items-center cursor-pointer group/brand' onClick={()=>setSelectedBrands(prev=> prev.includes(brand) ? prev.filter(b=>b !== brand) : [...prev, brand])}>
                <span className='text-sm text-slate-500 transition-all duration-200 ease-in group-hover/brand:text-slate-800'>{brand}</span>
                <span className='border rounded-full w-6 h-6 text-center leading-6 text-slate-600 text-xs transition-all duration-200 ease-in group-hover/brand:bg-orange-400/80 group-hover/brand:border-orange-400/80'> {counterBrand[brand]} </span>
              </li>
            ))}
          </ul>
        </div>

        {/* filter by color */}
        <div className='flex flex-col gap-3 border-t border-slate-300'>
          <h3 className="mt-4 text-xs lg:text-sm">Filter by Color</h3>
          {/* search by color */}
          <div className='relative w-full h-9'>
            <input type="search" id="" className='h-full w-full rounded-full border px-3 placeholder:text-xs' placeholder='Find a Color'/>
            <Search className='absolute top-1/2 -translate-y-1/2 right-2 size-5 text-slate-400'/>
          </div>
          <ul className='max-h-52 flex flex-col gap-3'>
            {uniqueColors.map(color=>(
              <li key={color.title} className='flex justify-between items-center cursor-pointer group/color' onClick={()=>setSelectedColors(selectedColors=> selectedColors.includes(color.title) ? selectedColors.filter(c=>c !== color.title) : [...selectedColors, color.title])}>
                <div className='flex gap-3 items-center'>
                  <span style={{backgroundColor: color.code}} className='rounded-full w-4 h-4 outline outline-1 outline-offset-4 outline-slate-200 transition-all duration-200 ease-in group-hover/color:outline-slate-700'></span>
                  <span className='text-xs md:text-sm text-slate-500 transition-all duration-200 ease-in group-hover/color:text-slate-800'>{color.title}</span>
                </div>
                <div className='border rounded-full w-6 h-6 text-center leading-6 text-slate-600 text-xs transition-all duration-200 ease-in group-hover/color:bg-orange-400/80 group-hover/color:border-orange-400/80'>{counterColor[color.title]}</div>
              </li>
            ))}
          </ul>
        </div>

      </div>
  )
}

export default Filterbar;