import React, { useState } from 'react';

import './DaySummary.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import Conversion from '../../utils/conversion';
import DayExtra from '../DayExtra/DayExtra';

export default function DaySummary ({ day, timeOffset, isDay, index }) {

    const [expanded, setExpanded] = useState(!index);

    const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

    let localOffset = (new Date().getTimezoneOffset() * 60);
    let fullDay = new Date((day.dt + timeOffset + localOffset) * 1000);
    let weekDay = fullDay.getDay();
    let dateDay = fullDay.getDate();

    let sRise = new Date((day.sunrise + timeOffset + localOffset) * 1000);
    let sSet = new Date((day.sunset + timeOffset + localOffset) * 1000);

    let sRiseHour = sRise.getHours();
    let sSetHour = sSet.getHours() % 12; 

    let sRiseMinute = sRise.getMinutes() < 10 ? '0' + sRise.getMinutes() : sRise.getMinutes();
    let sSetMinute = sSet.getMinutes() < 10 ? '0' + sSet.getMinutes() : sSet.getMinutes();

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
        riseTime: `${sRiseHour}:${sRiseMinute} am`,
        setTitle: "Sunset",
        setTime: `${sSetHour}:${sSetMinute} pm`,
        moonPhase: null
    }

    // Night object passed to DayExtra component
    let nightData = {
        title: 'Night',
        day: DAYS[weekDay],
        date: dateDay,
        temp: day.temp.night,
        main: day.weather[0].main, //
        pop: day.pop, //
        wind: `${Conversion.windDirection(day.wind_deg)} ${~~day.wind_speed} mph`, //
        description: Conversion.capitalizeAllWords(day.weather[0].description), //
        humidity: day.humidity, //
        uvi: day.uvi, //
        riseTitle: "Moonrise",
        riseTime: `${sRiseHour}:${sRiseMinute} am`, //
        setTitle: "Moonset",
        setTime: `${sSetHour}:${sSetMinute} pm`, //
        moonPhase: getMoonPhase(day.moon_phase)
    }

    function toggleExpanded () {
        setExpanded(prev => !prev);
    }

    function getMoonPhase (phase) {
        let phaseName = "New Moon";

        if (phase > 0 && phase < 0.25)
            phaseName = "Waxing Crescent"
        else if (phase === 0.25)
            phaseName = "First Quarter"
        else if (phase > 0.25 && phase < 0.5) 
            phaseName = "Waxing Gibbous"
        else if (phase === 0.5)
            phaseName = "Full Moon"
        else if (phase > 0.5 && phase < 0.75)
            phaseName = "Waning Gibbous"
        else if (phase === 0.75)
            phaseName = "Last Quarter"
        else if (phase > 0.75 && phase < 1)
            phaseName = "Waning Crescent"
        
        return phaseName
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