import React from 'react';

import './OneHour.scss';

export default function OneHour ({ hour, timeOffset }) {

    let hourTime = new Date((hour.dt + timeOffset) * 1000);
    let hourTimeHour = hourTime.getHours() % 12 ? hourTime.getHours() % 12 : 12;
    let antePost = hourTime.getHours() < 12 ? 'am' : 'pm'
    console.log("hour:", hourTimeHour)

    return (
        <div className="onehour-container">
            <div className="onehour-leftside">
                <div className="onehour-time">{`${hourTimeHour}:00 ${antePost}`}</div>
                <div className="onehour-temp">{~~hour.temp + '\u00B0'}</div>
            </div>
            <div className="onehour-rightside">

            </div>
        </div>
    )
}