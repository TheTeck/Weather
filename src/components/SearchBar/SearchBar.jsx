import React, { useState } from 'react';

import './SearchBar.scss';

export default function SearchBar (props) {

    const [zip, setZip] = useState('');

    const DEFAULT_PROMPT = "Search Zip Code";

    // Since zip codes can start with 0, HTML input validation would
    // not work. So only allow numeric values to be input here.
    function handleZipChange (e) {
        let value = e.target.value;

        if (!isNaN(value)) {                
            setZip(value.length > 5 ? value.slice(0, 5) : value);
        }
            
    }

    function handleSearchClick () {
        if (zip.length === 5) {
            props.getZipcode(zip);
            setZip('');
        }
    }

    function handleEnterPress (e) {
        if (e.keyCode === 13) {
            handleSearchClick();
        }
    }
    
    return (
        <div id="searchbar-container">
            <input 
                id="search-input" 
                placeholder={DEFAULT_PROMPT}
                value={zip} 
                onChange={handleZipChange}
                onKeyUp={handleEnterPress}>
            </input>
            
            <div id="search-button" onClick={handleSearchClick}>
                <div className="material-icons">search</div>
            </div>
        </div>
    )
}