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
    <section className='w-full flex justify-between lg:hidden '>

        {/* Left div */}
        <div>
            {/* currency */}
            <div className='border border-r-2 border-gray-400'>
                <button onClick={()=>setIsOpen(!isOpen)} className='bg-transparent border-none p-1 flex justify-between'>
                    <div className='flex'>
                        <img src={selected.flag} alt={selected.label} />
                        <span className='pl-1'>{selected.label}</span>
                    </div>
                    <img src="/images/arrow-bottom.svg" alt="arrow bottom" />
                </button>
                {isOpen && (
                    <ul className='w-6'>
                        {currencies.map(currency=>(
                            <li key={currency.label} onClick={()=>handleSelect(currency)}>
                                <img src={currency.flag} alt={currency.label} />
                                <span>{currency.label}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* menu */}
            <ul className='flex gap-1 pl-2'>
                {menu.map(item=>(
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>

        {/* Right Div */}
        <div className='flex gap-1'>
            {/* phone */}
            <div className='p-1 border-r-2 border-gray-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
    
                <span>(686) 492-1044</span>
            </div>

            {/* contact us */}
            <div>
                <img src="/images/contact-us-icon.png" alt="contact-us-icon" />
                <span>Contact with an Expert</span>
            </div>
        </div>

    </section>
  )
}

export default TopHeader;