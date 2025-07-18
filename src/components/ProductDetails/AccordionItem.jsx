import React from 'react';
import { ArrowRight } from 'lucide-react';

function AccordionItem({ title, index, openArcardon, setOpenArcardon, children }) {
  return (
    <div className='flex flex-col gap-3 overflow-hidden'>
      {/* head */}
      <div className='border-b cursor-pointer pb-3 flex justify-between items-center' onClick={() => setOpenArcardon(openArcardon === index ? -1 : index)}>
        <span>{title}</span>
        <ArrowRight className={`transition-all ${openArcardon === index ? 'rotate-90' : ''}`}/>
      </div>

      {/* body */}
      <div className={`transition-all text-slate-700 ${openArcardon === index ? 'py-3 h-auto' : 'h-0'}`}>
        {children}
      </div>
    </div>
  )
}

export default AccordionItem;