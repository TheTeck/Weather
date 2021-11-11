import React from 'react';

import './ExtendedDetail.scss';

export default function ExtendedDetail ({ icon, title, data, isFlex }) {
    return (
        <div className={"extendeddetail-container" + (isFlex ? " extendeddetail-get-smaller" : '')}>
            <div className="material-icons extra-icon">{icon}</div>
            <div>
                <div>{title}</div>
                <div className="extra-data">{data}</div>
            </div>
        </div>
    )
}