import { memo } from 'react';
import ModalsProduct from './ModalsProduct';


function AnimatedDot({dots, setActivePing, activePing}) {


  return (
    <>
      {dots?.map((dot,indx)=>(
          <div
            className='cursor-pointer z-20'
            key={indx}
            onMouseEnter={()=>setActivePing(dot)}
            onMouseLeave={()=>setActivePing(null)}
          >
            <div className='duration-200 animate-ping-slow bg-white rounded-full size-3 opacity-75 absolute' style={{top:dot.top, left:dot.left}}></div>
            <div className='bg-white size-1.5 rounded-full opacity-90 absolute left-1/2 -translate-x-1/2' style={{top:dot.top, left: dot.left}}></div>
            <div className='animate-scale-pulse bg-white size-2 rounded-full opacity-40 absolute' style={{top:dot.top, left:dot.left}}></div>

            {activePing?.productId === dot.productId && (
                <ModalsProduct activePing={activePing} />
            )}

          </div>
      ))}
    </>
  )
}

export default memo(AnimatedDot);