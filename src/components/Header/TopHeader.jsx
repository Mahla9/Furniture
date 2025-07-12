import React, {useState} from 'react';

const currencies = [
    { label: "EUR", flag: "/images/flageud.svg" },
    { label: "Canada", flag: "/images/flagcanada.svg" },
    { label: "USA", flag: "/images/flagusa.svg" },
    { label: "Japan", flag: "/images/flag-japan.svg" },
];
const menu = ["Gift Cards", "Showroom", "About Us"];


function TopHeader() {
    const [selected, setSelected] = useState(currencies[0]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (currency) => {
        setSelected(currency);
        setIsOpen(false)
    }

  return (
    <section className='bg-gray-100 hidden lg:flex w-full justify-between px-4 py-2'>

        {/* Left div */}
        <div className='flex '>
            {/* currency */}
            <div className='' onMouseEnter={()=>setIsOpen(!isOpen)} onMouseLeave={()=>setIsOpen(false)}>
                <button onClick={()=>setIsOpen(!isOpen)} className='bg-transparent border-none p-1 flex justify-between items-center w-24'>
                    <div className='flex'>
                        <img src={selected.flag} alt={selected.label} className='w-6'/>
                        <span className='pl-1 size-1 text-xs text-gray-600'>{selected.label}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>

                </button>

                <ul className={`absolute w-40 px-4 py-3 z-10 transition-all ease-out duration-300 ${isOpen? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"} bg-white shadow-lg rounded-md flex flex-col gap-2 `}>
                    {currencies.map(currency=>(
                        <li key={currency.label} onClick={()=>handleSelect(currency)} className='flex gap-2 cursor-pointer text-gray-600 transition-all ease-in duration-200 hover:text-orange-600'>
                            <img src={currency.flag} alt={currency.label} />
                            <span className='text-xs'>{currency.label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* menu */}
            <ul className='flex gap-2 pl-2'>
                {menu.map(item=>(
                    <li key={item} className='text-xs pl-4 cursor-pointer transition-all ease-in duration-150 hover:text-orange-600'>{item}</li>
                ))}
            </ul>
        </div>

        {/* Right Div */}
        <div className='flex gap-1 items-center'>
            {/* phone */}
            <div className='pr-2 border-gray-400 flex items-center before:w-[0.8px] before:h-7 relative before:absolute before:right-0 before:bg-gray-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 w-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
    
                <span className='text-nowrap text-xs ml-2'>(686) 492-1044</span>
            </div>

            {/* contact us */}
            <div className='pl-2 flex items-center gap-2'>
                <img src="/images/contact-us-icon.png" alt="contact-us-icon" />
                <span className='text-xs text-nowrap'>Contact with an Expert</span>
            </div>
        </div>

    </section>
  )
}

export default TopHeader;