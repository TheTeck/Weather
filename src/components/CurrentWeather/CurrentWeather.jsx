import React from 'react';

import './CurrentWeather.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import Conversion from '../../utils/conversion';

export default function CurrentWeather ({ weather, main, name, day }) {
    return (
        <div id="currentweather-container" >
            <div id="current-left-data">
                <p id="current-location">{name} Weather</p>
                <p id="big-temp">{~~main.temp + '\u00B0'}</p>
                <p id="current-description">{Conversion.capitalizeAllWords(weather.description)}</p>
            </div>
            <div id="current-right-data">
                <DynamicIcon id="huge-icon" width={160} height={160} weather={weather.main} day={day} />
                <p id="min-max-temp">{~~main.temp_min + '\u00B0/' + ~~main.temp_max + '\u00B0'}</p>
            </div>
        </div>
    )
}