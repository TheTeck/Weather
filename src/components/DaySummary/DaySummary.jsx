import React, { useState } from 'react';

import './DaySummary.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import Conversion from '../../utils/conversion';
import DayExtra from '../DayExtra/DayExtra';

export default function DaySummary ({ day, timeOffset, isDay, index }) {

    const [expanded, setExpanded] = useState(!index);

    const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

    let fullDay = new Date((day.dt + timeOffset +(new Date().getTimezoneOffset() * 60)) * 1000);
    let weekDay = fullDay.getDay();
    let dateDay = fullDay.getDate();

    function toggleExpanded () {
        setExpanded(prev => !prev);
    }

    // Day object passed to DayExtra component
    let dayData = {
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
        riseTime: day.sunrise,
        setTitle: "Sunset",
        setTime: day.sunset
    }

    return (
        <div className="daysummary-container">
            {
                expanded ? <div className="daysummary-extra-full-container" onClick={toggleExpanded}>
                    <div className="material-icons daysummary-less">expand_less</div>
                    <div className="extra-wrapper">
                        <DayExtra data={dayData} />
                        <DayExtra data={dayData} />
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
                        <DynamicIcon width={60} height={60} weather={day.weather[0].main} day={isDay} />
                        <div>{Conversion.capitalizeAllWords(day.weather[0].description)}</div>
                    </div>

                    <div className="daysummary-rightside">
                        <div className="daysummary-rain-wind">
                            <div className="daysummary-rain">
                                <img src="icons/rain.png" />
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