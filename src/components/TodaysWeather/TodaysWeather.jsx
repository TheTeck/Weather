import React from 'react';

import './TodaysWeather.scss';
import SunRiseSet from '../SunRiseSet/SunRiseSet';
import TodaysDetails from '../TodaysDetails/TodaysDetails';

export default function TodaysWeather ({ name, weather, temp, timezoneOffset }) {
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
                        icon={<img src="icons/temp.png" />}
                        description="High / Low"
                        data={`${~~temp.temp_max}\u00B0 / ${~~temp.temp_min}\u00B0`}
                    />
                    <TodaysDetails 
                        icon={<img src="icons/uv.png" />}
                        description="UV Index"
                        data={weather.uvi}
                    />
                    <TodaysDetails />
                    <TodaysDetails />
                </div>
                <div className="todays-details">
                    <TodaysDetails 
                        icon={<img src="icons/wind.png" />}
                        description="Wind Speed"
                        data={`${~~weather.wind_speed} mph`}
                    />
                    <TodaysDetails 
                        icon={<div className="material-icons details-mat-icon">near_me</div>}
                        description="Wind Direction"
                        data={`${weather.wind_deg}\u00B0`}
                    />
                    <TodaysDetails />
                    <TodaysDetails />
                </div>
            </div>
        </div>
    )
}