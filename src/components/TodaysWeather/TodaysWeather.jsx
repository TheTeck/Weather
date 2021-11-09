import React from 'react';

import './TodaysWeather.scss';
import SunRiseSet from '../SunRiseSet/SunRiseSet';
import TodaysDetails from '../TodaysDetails/TodaysDetails';

export default function TodaysWeather ({ name, weather, temp, timezoneOffset }) {

    const MILLIBAR_PER_MERCURY = 0.0295;
    const METER_PER_MILE = 1609.344;
    let windDirection = 'N';
    let wd = weather.wind_deg;

    if (wd > 348.75 && wd <= 11.25) {
        windDirection = 'N'
    } else if (wd > 11.25 && wd <= 33.75) {
        windDirection = 'NNE'
    } else if (wd > 33.75 && wd <= 56.25) {
        windDirection = 'NE'
    } else if (wd > 56.25 && wd <= 78.75) {
        windDirection = 'ENE'
    } else if (wd > 78.75 && wd <= 101.25) {
        windDirection = 'E'
    } else if (wd > 101.25 && wd <= 123.75) {
        windDirection = 'ESE'
    } else if (wd > 123.75 && wd <= 146.25) {
        windDirection = 'SE'
    } else if (wd > 146.25 && wd <= 168.75) {
        windDirection = 'SSE'
    } else if (wd > 168.75 && wd <= 191.25) {
        windDirection = 'S'
    } else if (wd > 191.25 && wd <= 213.75) {
        windDirection = 'SSW'
    } else if (wd > 213.75 && wd <= 236.25) {
        windDirection = 'SW'
    } else if (wd > 236.25 && wd <= 258.75) {
        windDirection = 'WSW'
    } else if (wd > 258.75 && wd <= 281.25) {
        windDirection = 'W'
    } else if (wd > 281.25 && wd <= 303.75) {
        windDirection = 'WNW'
    } else if (wd > 303.75 && wd <= 326.25) {
        windDirection = 'NW'
    } else {
        windDirection = 'NNW'
    }

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
            <div className="flex-split">
                <div className="todays-details">
                    <TodaysDetails 
                        icon={<div className="material-icons details-mat-icon">thermostat</div>}
                        description="High / Low"
                        data={`${~~temp.temp_max}\u00B0 / ${~~temp.temp_min}\u00B0`}
                    />
                    <TodaysDetails 
                        icon={<div className="material-icons details-mat-icon">water_drop</div>}
                        description="Humidity"
                        data={`${weather.humidity}%`}
                    />
                    <TodaysDetails 
                        icon={<div className="material-icons details-mat-icon">opacity</div>}
                        description="Dew Point"
                        data={`${~~weather.dew_point}\u00B0`}
                    />
                    <TodaysDetails 
                        icon={<div className="material-icons details-mat-icon">wb_sunny</div>}
                        description="UV Index"
                        data={weather.uvi}
                    />
                </div>
                <div className="todays-details">
                    <TodaysDetails 
                        icon={<div className="material-icons details-mat-icon">air</div>}
                        description="Wind Speed"
                        data={`${~~weather.wind_speed} mph`}
                    />
                    <TodaysDetails 
                        icon={<div className="material-icons details-mat-icon">near_me</div>}
                        description="Wind Direction"
                        data={windDirection}
                    />
                    <TodaysDetails 
                        icon={<div className="material-icons details-mat-icon">speed</div>}
                        description="Pressure"
                        data={`${(weather.pressure * MILLIBAR_PER_MERCURY).toFixed(1)} inHg`}
                    />
                    <TodaysDetails 
                        icon={<div className="material-icons details-mat-icon">visibility</div>}
                        description="Visibility"
                        data={`${~~(weather.visibility / METER_PER_MILE)} mi`}
                    />
                </div>
            </div>
        </div>
    )
}