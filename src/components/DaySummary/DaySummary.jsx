import React, { useState } from 'react';

import './DaySummary.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import Conversion from '../../utils/conversion';
import DayExtra from '../DayExtra/DayExtra';

export default function DaySummary ({ day, timeOffset, index }) {

    const [expanded, setExpanded] = useState(!index);

    const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

    let localOffset = (new Date().getTimezoneOffset() * 60);
    let fullDay = new Date((day.dt + timeOffset + localOffset) * 1000);
    let weekDay = fullDay.getDay();
    let dateDay = fullDay.getDate();

    // Day object passed to DayExtra component
    const dayData = {
        title: 'Day',
        day: DAYS[weekDay],
        date: dateDay,
        temp: day.temp.day,
        main: day.weather[0].main,
        pop: day.pop,
        wind: `${Conversion.windDirection(day.wind_deg)} ${~~day.wind_speed} mph`,
        description: Conversion.capitalizeAllWords(day.weather[0].description),
        humidity: day.humidity,
        uvi: day.uvi,
        riseTitle: "Sunrise",
        riseTime: `${Conversion.dateToTime(new Date((day.sunrise + timeOffset + localOffset) * 1000))} am`,
        setTitle: "Sunset",
        setTime: `${Conversion.dateToTime(new Date((day.sunset + timeOffset + localOffset) * 1000))} pm`,
        moonPhase: null
    }

    // Night object passed to DayExtra component
    let nightData = {
        title: 'Night',
        day: DAYS[weekDay],
        date: dateDay,
        temp: day.temp.night,
        main: day.weather[0].main, // No data for this, reuse the day's weather
        pop: day.pop, // No data for this, resuse the day's precipitation value
        wind: `${Conversion.windDirection(day.wind_deg)} ${~~day.wind_speed} mph`, // No data here either
        description: Conversion.capitalizeAllWords(day.weather[0].description), // Again, no data available
        humidity: day.humidity <= 89 ? day.humidity + 11 : 100, // Based on observation, night is 11% more humid than the day on average
        uvi: 0,
        riseTitle: "Moonrise",
        riseTime: `${Conversion.dateToTime(new Date((day.moonrise + timeOffset + localOffset) * 1000))} pm`,
        setTitle: "Moonset",
        setTime: `${Conversion.dateToTime(new Date((day.moonset + timeOffset + localOffset) * 1000))} am`,
        moonPhase: Conversion.moonPhase(day.moon_phase)
    }

    function toggleExpanded () {
        setExpanded(prev => !prev);
    }

    return (
        <div className="daysummary-container">
            {
                expanded ? <div className="daysummary-extra-full-container" onClick={toggleExpanded}>
                    <div className="material-icons daysummary-less">expand_less</div>
                    <div className="extra-wrapper">
                        <DayExtra data={dayData} />
                        <DayExtra data={nightData} />
                    </div>
                </div>
                : <div className="daysummary-main-container" onClick={toggleExpanded}>
                    <div className="daysummary-leftside">
                        {
                            index ? <div className="daysummary-date">{DAYS[weekDay] + ' ' + dateDay}</div>
                                : <div className="daysummary-date">Today</div>
                        }
                        
                        <div className="daysummary-temp">{~~day.temp.max + '\u00B0/' + ~~day.temp.min + '\u00B0'}</div>               
                    </div>

                    <div className="daysummary-weather">
                        <DynamicIcon width={60} height={60} weather={day.weather[0].main} day={true} />
                        <div>{Conversion.capitalizeAllWords(day.weather[0].description)}</div>
                    </div>

                    <div className="daysummary-rightside">
                        <div className="daysummary-rain-wind">
                            <div className="daysummary-rain">
                                <img src="icons/rain.png" alt="Cloud with rain falling down from it." />
                                <div>{~~day.pop + '\u00B0'}</div>
                            </div>
                            <div className="daysummary-wind">
                                <div className="material-icons daysummary-wind-icon">air</div>
                                <div className="daysummary-wind-data">
                                    {`${Conversion.windDirection(day.wind_deg)} ${~~day.wind_speed} mph`}
                                </div>
                            </div>
                        </div> 
                        <div className="material-icons daysummary-more">expand_more</div>
                    </div> 
                </div>
            }
        </div>
    )
}