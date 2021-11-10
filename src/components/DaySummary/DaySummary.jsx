import React, { useState } from 'react';

import './DaySummary.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import Conversion from '../../utils/conversion';

export default function DaySummary ({ day, timeOffset, isDay, index }) {

    const [expanded, setExpanded] = useState(false);

    const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

    let fullDay = new Date((day.dt + timeOffset +(new Date().getTimezoneOffset() * 60)) * 1000);
    let weekDay = fullDay.getDay();
    let dateDay = fullDay.getDate();

    function toggleExpanded () {
        setExpanded(prev => !prev);
    }

    return (
        <div className="daysummary-container">
            <div className="daysummary-main-container" onClick={toggleExpanded}>
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
                    {
                        expanded ? <div className="material-icons onehour-more">expand_less</div>
                            : <div className="material-icons onehour-more">expand_more</div>
                    }
                </div> 
            </div>
        </div>
    )
}