import React from 'react';

import './QuarterDayForecast.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';

export default function QuarterDayForecast ({ title, hour, day }) {
    console.log(hour.weather[0])
    return (
        <div className="quarterdayforecast-container">
            <p className="quarterday-title">{title}</p>
            <p className="quarterday-temp">{~~hour.temp + '\u00B0'}</p>
            <DynamicIcon width={70} height={70} weather={hour.weather[0].main} day={day} />
            <div className="quarterday-precipitation">
                <DynamicIcon width={25} height={25} weather={"Precipitation"} day={day} />
                <p>{hour.pop}%</p>
            </div>
        </div>
    )
}