import React from 'react';

import './HourlyData.scss';
import OneHour from '../../components/OneHour/OneHour';

export default function HourlyData ({ name, data, timezoneOffset, hours }) {

    let today = new Date((data.dt + timezoneOffset) * 1000);
    // seconds in a day
    const ONE_DAY = 86400

    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const MONTHS = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return (
        <section id="hourlydata-container">
            <div id="hourly-header">
                <p id="hourly-title"><span>Hourly Weather</span> - {name}</p>
                <p id="hourly-date">{`${DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}`}</p>
            </div>
            <div id="hours-container">
                {
                    
                    hours.slice(0, 24).map((hour, index) => {
                        let day = (hour.dt >= data.sunrise && hour.dt <= data.sunset) 
                            ||  (hour.dt >= data.sunrise + ONE_DAY && hour.dt <= data.sunset + ONE_DAY);
                        return <OneHour hour={hour} timeOffset={timezoneOffset} key={index} day={day} />
                    })
                }
            </div>
        </section>
    )
}