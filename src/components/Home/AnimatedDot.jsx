import React, {useState} from 'react';
import ModalsProduct from './ModalsProduct';


function AnimatedDot({dots}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="cursor-pointer"
        onMouseEnter={() => setShowModal(true)}
        onMouseLeave={() => setShowModal(false)}>
      {dots?.map(dot=>(
          <React.Fragment key={dot.productId}>
          <div className='duration-200 animate-ping-slow bg-white rounded-full size-3 opacity-75 absolute' style={{top:dot.top, left:dot.left}}></div>
          <div className='bg-white size-1.5 rounded-full opacity-90 absolute' style={{top:dot.top, left:dot.left}}></div>
          <div className='animate-scale-pulse bg-white size-2 rounded-full opacity-40 absolute' style={{top:dot.top, left:dot.left}}></div>
          {showModal && <ModalsProduct />}
          </React.Fragment>
      ))}
      
    </div>
  )
}

export default AnimatedDot;