import React from 'react';

import './Loading.scss';

export default function Loading (props) {
    return (
        <div id="loading-container">
            <div className="spinner spinner-dark">
                <div className="spinner">
                    <div className="spinner spinner-white">
                        <div className="spinner"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}