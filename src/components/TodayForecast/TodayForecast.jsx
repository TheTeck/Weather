import React from 'react';

import './TodayForecast.scss';
import QuarterDayForecast from '../QuarterDayForecast/QuarterDayForecast';

export default function TodayForecast ({ name, hourly }) {

    const localOffset = (new Date().getTimezoneOffset()) * 60;
    let first = new Date((hourly[12].dt + localOffset) * 1000).toLocaleString();

    return (
        <div id="todayforecast-container">
            <p id="todayforecast-title">{`Today's Forecast for ${name}`}</p>
            <div id="quarterday-container">
                <QuarterDayForecast title="Morning" hour={hourly[5]} day={true} />
                <div className="divider"></div>
                <QuarterDayForecast title="Afternoon" hour={hourly[11]} day={true} />
                <div className="divider"></div>
                <QuarterDayForecast title="Evening" hour={hourly[17]} day={false} />
                <div className="divider"></div>
                <QuarterDayForecast title="Overnight" hour={hourly[23]} day={false} />
            </div>
        </div>
    )
}