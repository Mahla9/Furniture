import React, {useState} from 'react';
import TopHeader from './TopHeader';
import MiddleHeader from './MiddleHeader';
import BottomHeader from './BottomHeader';


function Header() {
    

  return (
    <div className='w-full container '>
      <TopHeader/>
      <MiddleHeader/>
      <BottomHeader/>
    </div>
  )
}

export default Header
