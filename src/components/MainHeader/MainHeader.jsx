import React from 'react';

import './MainHeader.scss';
import SearchBar from '../SearchBar/SearchBar';

export default function MainHeader (props) {
    return (
        <div id="mainheader-container">
            <p id="app-title">Weather App</p>
            <SearchBar getZipcode={props.getZipcode} />
        </div>
    )
}