import React from 'react';

import './DayExtra.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';

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
                        <div className="icon-text">{data.pop}%</div>
                    </div>
                    <div className="wind-or-rain">
                        <div className="material-icons blue-icon">air</div>
                        <div className="icon-text">{data.wind}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}