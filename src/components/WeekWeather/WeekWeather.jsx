import React from 'react';

import './WeekWeather.scss';
import DaySummary from '../DaySummary/DaySummary';

export default function WeekWeather ({ name, days, isDay, timeOffset }) {
    return (
        <div id="weekweather-container">
            <div id="weekweather-header">
                <p><span>7 Day Weather</span> - {name}</p>
            </div>
            <div id="weekweather-days">
                {
                    days.slice(0, 7).map((day, index) => {
                        return <DaySummary day={day} timeOffset={timeOffset} isDay={isDay} index={index} />
                    })
                }
            </div>
        </div>
    )
}