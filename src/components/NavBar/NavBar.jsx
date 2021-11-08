import React from 'react';

import './NavBar.scss';
import NavButton from '../NavButton/NavButton';

export default function NavBar ({ pages, active, getActivePage }) {


    return (
        <nav>
            {
                pages.map((page, index) => {
                 return (
                     <NavButton key={index} name={page} active={page === active} getActivePage={getActivePage} />
                 )
                })
            }
        </nav>
    )
}