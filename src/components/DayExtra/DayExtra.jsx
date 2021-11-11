import React from 'react';

import './DayExtra.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import ExtendedDetail from '../ExtendedDetail/ExtendedDetail';

export default function DayExtra ({ data }) {
    return (
        <div className="dayextra-container">
            <div className="dayextra-header">
                <span>{data.day} {data.date}</span> - {data.title}
            </div>
            <div className="extra-main-content">
                <div className="extra-big-temp">{~~data.temp + '\u00B0'}</div>
                <DynamicIcon width={60} height={60} weather={data.main} day={data.title === 'Day'} />
                <div className="extra-wind-rain">
                    <div className="wind-or-rain">
                        <img src="icons/rain.png" />
                        <div className="icon-text">{~~(data.pop + 0.5)}%</div>
                    </div>
                    <div className="wind-or-rain">
                        <div className="material-icons blue-icon">air</div>
                        <div className="icon-text">{data.wind}</div>
                    </div>
                </div>
            </div>
            <div className="day-extended-container">
                <div className="day-extended-wrapper">
                    <ExtendedDetail 
                        icon="water_drop"
                        title="Humidity"
                        data={data.humidity + '%'}
                        isFlex={false}
                    />
                    <ExtendedDetail 
                        icon="wb_sunny"
                        title="UV Index"
                        data={~~(data.uvi + 0.5) + ' of 10'}
                        isFlex={false}
                    />
                </div>
                <div className="always-divider"></div>
                <div className="day-extended-wrapper">
                    <ExtendedDetail 
                        icon="upload"
                        title={data.riseTitle}
                        data={data.riseTime}
                        isFlex={false}
                    />
                    <ExtendedDetail 
                        icon="download"
                        title={data.setTitle}
                        data={data.setTime}
                        isFlex={false}
                    />
                </div>
                {
                data.moonPhase ? <div className="moon-phase">
                    <div className="material-icons">nightlight</div>
                    <p>{data.moonPhase}</p>
                </div>
                : <div className="no-moon-phase"></div>
                }
            </div>
            
        </div>
    )
}