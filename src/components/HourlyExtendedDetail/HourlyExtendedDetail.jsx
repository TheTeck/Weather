import React from 'react';

import './HourlyExtendedDetail.scss';

export default function HourlyExtendedDetail ({ icon, title, data }) {
    return (
        <div className="extendeddetail-container">
            <div className="material-icons extra-icon">{icon}</div>
            <div>
                <div>{title}</div>
                <div className="extra-data">{data}</div>
            </div>
        </div>
    )
}