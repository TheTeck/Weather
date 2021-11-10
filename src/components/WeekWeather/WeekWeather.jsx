import React from 'react';

import './WeekWeather.scss';

export default function WeekWeather ({ name }) {
    return (
        <div id="weekweather-container">
            <div id="weekweather-header">
                <p><span>7 Day Weather</span> - {name}</p>
            </div>
        </div>
    )
}