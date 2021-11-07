import React from 'react';

import './CurrentWeather.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';

export default function CurrentWeather ({ weather, main, name }) {

    let descriptionWords = weather.description.split(' ');
    let description = descriptionWords.map(word => {
        return word[0].toUpperCase() + (word.length > 1 ? word.slice(1) : '');
    }).join(' ');

    return (
        <div id="currentweather-container" >
            <div id="current-left-data">
                <p id="current-location">{name} Weather</p>
                <p id="big-temp">{~~main.temp + '\u00B0'}</p>
                <p id="current-description">{description}</p>
            </div>
            <div id="current-right-data">
                <DynamicIcon id="huge-icon" width={160} height={160} />
                <p id="min-max-temp">{~~main.temp_min + '\u00B0/' + ~~main.temp_max + '\u00B0'}</p>
            </div>
        </div>
    )
}