import React from 'react';

import './TodayForecast.scss';
import QuarterDayForecast from '../QuarterDayForecast/QuarterDayForecast';

export default function TodayForecast ({ name, hourly, currentTime, timezoneOffset, temps }) {

    const localOffset = (new Date().getTimezoneOffset()) * 60;

    let thisHour = new Date((currentTime + localOffset + timezoneOffset) * 1000).getHours();

    const PAST = {
        temp: '-',
        weather: ['-'],
        pop: 0
    }

    return (
        <section id="todayforecast-container">
            <p id="todayforecast-title">{`Today's Forecast for ${name}`}</p>
            <div id="quarterday-container">
                <QuarterDayForecast title="Morning" hour={thisHour > 11 ? PAST : hourly[11-thisHour]} day={true} temp={temps.morn} />
                <div className="divider"></div>
                <QuarterDayForecast title="Afternoon" hour={thisHour > 17 ? PAST: hourly[17-thisHour]} day={true} temp={temps.day} />
                <div className="divider"></div>
                <QuarterDayForecast title="Evening" hour={thisHour > 23 ? PAST : hourly[23-thisHour]} day={false} temp={temps.eve} />
                <div className="divider"></div>
                <QuarterDayForecast title="Overnight" hour={hourly[29-thisHour]} day={false} temp={temps.night} />
            </div>
        </section>
    )
}