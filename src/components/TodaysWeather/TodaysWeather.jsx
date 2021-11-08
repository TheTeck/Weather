import React from 'react';

import './TodaysWeather.scss';
import SunRiseSet from '../SunRiseSet/SunRiseSet';

export default function TodaysWeather ({ name, weather, timezoneOffset }) {
    return (
        <div id="todaysweather-container">
            <p id="todaysweather-title">Weather Today in {name}</p>
            <div className="split-left-right">
                <div id="todays-temp">
                    <p id="actual-temp">{~~weather.temp + '\u00B0'}</p>
                    <p id="feels-like-temp">{`Feels like ${~~weather.feels_like}\u00B0`}</p>
                </div>
                <SunRiseSet sunrise={weather.sunrise} sunset={weather.sunset} timezoneOffset={timezoneOffset} />
            </div>
        </div>
    )
}