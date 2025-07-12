import React from 'react';
import TopHeader from './TopHeader';
import MiddleHeader from './MiddleHeader';
import BottomHeader from './BottomHeader';


function Header() {
    

  return (
    <header className='w-full container flex flex-col'>
      <TopHeader/>
      <MiddleHeader/>
      <BottomHeader/>
    </header>
  )
}

export default Header
