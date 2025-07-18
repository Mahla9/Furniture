import React from 'react'
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom'

function Breadcrump() {
    // const location = useLocation();
    // const pathnames = location.pathname.split('/').filter(x => x);
    return(
        <nav className='container mt-6 mb-9 flex items-center'>
            <Link to="/">Home</Link>
            {/* {pathnames.map((name,index)=>{
                const referTo= '/' + pathnames.slice(0, index+1);
                const isLast = index === pathnames.length - 1;
                return (
                    <span key={referTo} className='flex items-center capitalize'>
                        {isLast ? (
                        <span>{decodeURIComponent(name)}</span>
                    ) : (
                        <Link to={referTo}>{decodeURIComponent(name)}</Link>
                    )}
                    </span>
                )
        })} */}
        </nav>
    )
}

export default Breadcrump
