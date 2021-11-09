import React from 'react';

import './HourlyData.scss';

export default function HourlyData ({ name, data, timezoneOffset }) {

    const localOffset = (new Date().getTimezoneOffset()) * 60;
    let today = new Date((data.dt + localOffset + timezoneOffset) * 1000);

    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const MONTHS = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return (
        <div id="hourlydata-container">
            <p id="hourly-title"><span>Hourly Weather</span> - {name}</p>
            <p id="hourly-date">{`${DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}`}</p>
        </div>
    )
}