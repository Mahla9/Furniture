import React from 'react';
import TopHeader from './TopHeader';
import MiddleHeader from './MiddleHeader';
import BottomHeader from './BottomHeader';
import BottomFixHead from './BottomFixHead'


function Header({filters,setShowFilterbar}) {
    

  return (
    <header className='w-full container flex flex-col'>
      <TopHeader/>
      <MiddleHeader/>
      <BottomHeader/>
      <BottomFixHead filters={filters} setShowFilterbar={setShowFilterbar}/>
    </header>
  )
}

export default Header
