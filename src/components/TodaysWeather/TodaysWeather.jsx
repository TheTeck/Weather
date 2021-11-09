import React from 'react';

import './TodaysWeather.scss';
import SunRiseSet from '../SunRiseSet/SunRiseSet';
import TodaysDetails from '../TodaysDetails/TodaysDetails';
import Conversion from '../../utils/conversion';

export default function TodaysWeather ({ name, weather, temp, timezoneOffset }) {

    const MILLIBAR_PER_MERCURY = 0.0295;
    const METER_PER_MILE = 1609.344;
    

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
                        data={Conversion.windDirection(weather.wind_deg)}
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