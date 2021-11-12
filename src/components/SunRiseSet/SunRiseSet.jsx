import React from 'react';

import './SunRiseSet.scss';

export default function SunRiseSet ({ sunrise, sunset, timezoneOffset }) {

    let localOffset = (new Date().getTimezoneOffset()) * 60;
    let sRise = new Date((sunrise + localOffset + timezoneOffset) * 1000);
    let sSet = new Date((sunset + localOffset + timezoneOffset) * 1000);
    
    let sRiseHour = sRise.getHours();
    let sSetHour = sSet.getHours() % 12; 

    let sRiseMinute = sRise.getMinutes() < 10 ? '0' + sRise.getMinutes() : sRise.getMinutes();
    let sSetMinute = sSet.getMinutes() < 10 ? '0' + sSet.getMinutes() : sSet.getMinutes();

    return (
        <div id="sunriseset-container">
            <div id="sun-outline"></div>
            <div id="rise-set-data">
                <div className="material-icons">upload</div>
                <p>{`${sRiseHour}:${sRiseMinute} am`}</p>
                <div className="material-icons">download</div>
                <p>{`${sSetHour}:${sSetMinute} pm`}</p>
            </div>
        </div>
    )
}