import React from 'react';

import './TodaysDetails.scss';

export default function TodaysDetails ({ icon, description, data }) {
    return (
        <div className="todaysdetails-container">
            <div className="icon-description">
                {icon}
                {description}
            </div>
            <div className="todaysdetails-data">
                {data}
            </div>
        </div>
    )
}