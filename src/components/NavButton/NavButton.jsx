import React from 'react';

import './NavButton.scss';

export default function NavButton ({ name, active, getActivePage }) {

    function handleNavClick () {
        getActivePage(name);
    }

    return (
        <>
        {
            active ? <button className="nav-button-container active-button">{name}</button>
            : <button className="nav-button-container" onClick={handleNavClick}>{name}</button>
        }
        </>
    )
}