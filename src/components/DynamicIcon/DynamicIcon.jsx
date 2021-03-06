import React from 'react';

import './DynamicIcon.scss';

export default function DynamicIcon ({ width, height, weather, day, isMobile}) {

    let output = "sunny";

    // Determine the proper icon based on main weather and day/night state
    if (weather === "Precipitation") {
        output = "precipitation"
    } else if (weather === "Thunderstorm") {
        output = "lightning";
    } else if (weather === "Snow") {
        output = "snow";
    } else if (weather === "Clear" && day) {
        output = "sunny";
    } else if (weather === "Clear" && !day) {
        output = "night";
    } else if (weather === "Clouds" && day) {
        output = "clouds";
    } else if (weather === "Clouds" && !day) {
        output = "night_clouds";
    } else if ((weather === "Drizzle" || weather === "Rain") && day) {
        output = "rain";
    } else if ((weather === "Drizzle" || weather === "Rain") && !day) {
        output = "night_rain";
    } else {
        output = "atmosphere";
    }

    let alt = `Some ${weather} weather`;

    let dynamicClass = `icon-ismobile-${isMobile}`;

    return (
        <img 
            className={dynamicClass}
            src={`icons/${output}.png`}
            style={{
                width: `${width}px`,
                height: `${height}px`
            }}
            alt={alt}
            />
    )
}