import React from 'react';

function AppliedFilters({selectedColors, selectedBrands, setSelectedBrands, setSelectedColors, minPrice, maxPrice, setAppliedPrice}) {
  return (
    <div className='flex gap-3 items-center'>
      {minPrice !== 0 && <span className='cursor-pointer' onClick={()=>setAppliedPrice([0, maxPrice])}> x {minPrice} </span>}
      {maxPrice !== 10000 && <span className='cursor-pointer' onClick={()=>setAppliedPrice([minPrice, 10000]) }> x {maxPrice} </span>}

      {selectedBrands?.length>0 && selectedBrands.map(brand=>(
        <span className='cursor-pointer' key={brand} onClick={()=>setSelectedBrands(prev=>prev.filter(b=>b !== brand))}> x {brand} </span>
      ))}

      {selectedColors?.length>0 && selectedColors.map(color=>(
        <span className='cursor-pointer' key={color} onClick={()=>setSelectedColors(colors=>colors.filter(c=> c !== color))}> x {color} </span>
      ))}
    </div>
  )
}

export default AppliedFilters;