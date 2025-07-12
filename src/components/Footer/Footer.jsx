import React from 'react'

const categories = ["Chairs","Tables","Sofas","Armchairs","Beds","Storage","Textiles","Lighting","Toys","Decor"]

function Footer() {

  return (
    <footer className='bg-black'>
        <div className='pb-12 px-10 md:px-16 flex flex-col gap-4 md:flex-row md:justify-between md:items-center border-b-[1px] border-slate-600'>
            {/* left footer */}
            <div className='flex flex-col items-start gap-5 w-[50%]'>
                <div className='max-w-60 -translate-x-8'>
                    <img src="/images/Logo.png" alt="Logo" className='h-full w-full'/>
                </div>
                <div className='flex flex-col gap-8 md:items-center md:flex-row w-full md:justify-between'>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-white font-semibold text-xl'>Useful links</h3>
                        <ul className='flex flex-col gap-3 text-gray-400'>
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>Showrooms</li>
                            <li>Blog</li>
                            <li>Gift Cards</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-4 w-[50%]'>
                        <h3 className='text-white font-semibold text-xl'>Categories</h3>
                        <div className='flex justify-between w-full'>
                            <ul className='flex flex-col gap-3 text-gray-400'>
                                {categories.slice(0,5).map((category,i)=>(
                                <li key={i}> {category} </li>
                                ))}
                            </ul>
                            <ul className='flex flex-col gap-3 text-gray-400'>
                                {categories.slice(5,10).map((category,i)=>(
                                <li key={i}> {category} </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* right footer */}
            <div className='flex flex-col items-start gap-5'>
                <div className='flex gap-2 mb-8'>
                    <h4 className='text-white text-xl'>Subscribe us:</h4>
                    {/* sicials media icons */}
                    <div className='flex gap-2'>
                        <img src="/images/social-network/icons8-instagram-32.png" alt="instagram" />
                        <img src="/images/social-network/icons8-linkedin-32.png" alt="linkedin" />
                        <img src="/images/social-network/icons8-x-32.png" alt="x" />
                        <img src="/images/social-network/icons8-youtube-32.png" alt="youtube" />
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <h3 className='text-white'>Download App on Mobile:</h3>
                    <span className='text-gray-400'>15% discount on your first purchase</span>
                    <div className='flex gap-3 mt-4'>
                        <img src="/images/googleplay.svg" alt="google play" />
                        <img src="/images/appstore.svg" alt="app store" />
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-3 px-12 flex gap-4 flex-col items-center justify-center md:flex-row md:justify-between'>
            <p className="text-center text-sm text-gray-400">
                WebNebula &copy; {new Date().getFullYear()} — Designed & Developed by <strong className='text-gray-300'>Mahla</strong> . Creative Web Solutions.
            </p>

            <img src="/images/payments.png" alt="payments" />
            
        </div>
        <small className="text-start px-12 py-5 block text-gray-400 text-xs mt-2">
            *Product images and icons used for demo purposes only.
        </small>
    </footer>
  )
}

export default Footer
