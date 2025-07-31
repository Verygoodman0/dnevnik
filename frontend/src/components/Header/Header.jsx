import {Link} from "react-router-dom"
import React from 'react';
import './Header.css'

const Header = () => {
     return (  
        <>
            <header className="header">
                <Link to="/" className='linkH'>
                    <h1>
                        Home
                    </h1>
                </Link>
            </header>
        </>
    )
    
}

export default Header;