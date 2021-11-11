import React, { useState } from 'react';

import './OneHour.scss';
import Conversion from '../../utils/conversion';
import DynamicIcon from '../../components/DynamicIcon/DynamicIcon';
import ExtendedDetail from '../ExtendedDetail/ExtendedDetail';

export default function OneHour ({ hour, timeOffset, day }) {

    const [expanded, setExpanded] = useState(false);

    let hourTime = new Date((hour.dt + timeOffset +(new Date().getTimezoneOffset() * 60)) * 1000);
    let hourTimeHour = hourTime.getHours() % 12 ? hourTime.getHours() % 12 : 12;
    let antePost = hourTime.getHours() < 12 ? 'am' : 'pm'

    function toggleExpanded () {
        setExpanded(prev => !prev);
    }

    return (
        <div className="onehour-full-container">
            <div className="onehour-container" onClick={toggleExpanded}>
                <div className="onehour-leftside">
                    <div className="onehour-time">{`${hourTimeHour}:00 ${antePost}`}</div>
                    <div className="onehour-temp">{~~hour.temp + '\u00B0'}</div>               
                </div>

                <div className="onehour-weather">
                    <DynamicIcon width={60} height={60} weather={hour.weather[0].main} day={day} />
                    <div>{Conversion.capitalizeAllWords(hour.weather[0].description)}</div>
                </div>

                <div className="onehour-rightside">
                    <div className="onehour-rain-wind">
                        <div className="onehour-rain">
                            <img src="icons/rain.png" />
                            <div>{~~(hour.pop + 0.5) + '\u00B0'}</div>
                        </div>
                        <div className="onehour-wind">
                            <div className="material-icons onehour-wind-icon">air</div>
                            <div className="onehour-wind-data">
                                {`${Conversion.windDirection(hour.wind_deg)} ${~~(hour.wind_speed + 0.5)} mph`}
                            </div>
                        </div>
                    </div>
                    {
                        expanded ? <div className="material-icons onehour-more">expand_less</div>
                            : <div className="material-icons onehour-more">expand_more</div>
                    }
                </div> 
            </div>
            {
                expanded ? <div className="onehour-extended-container" onClick={toggleExpanded}>
                    <div className="onehour-extended-title">{Conversion.capitalizeAllWords(hour.weather[0].description)}</div>
                    <div className="extended-container">
                        <ExtendedDetail 
                            icon="thermostat"
                            title="Feels Like"
                            data={~~hour.feels_like + '\u00B0'}
                            isFlex={true}
                        />
                        <ExtendedDetail 
                            icon="air"
                            title="Wind"
                            data={`${Conversion.windDirection(hour.wind_deg)} ${~~(hour.wind_speed + 0.5)} mph`}
                            isFlex={true}
                        />
                        <div className="extra-divider"></div>
                        <ExtendedDetail 
                            icon="water_drop"
                            title="Humidity"
                            data={hour.humidity + '%'}
                            isFlex={true}
                        />
                        <ExtendedDetail 
                            icon="wb_sunny"
                            title="UV Index"
                            data={~~(hour.uvi + 0.5) + ' of 10'}
                            isFlex={true}
                        />
                    </div>
                </div> : ''
            }
            
        </div>
    )
}