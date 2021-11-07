import React from 'react';

import './DynamicIcon.scss';

export default function DynamicIcon (props) {
    return (
        <img 
            src="icons/night.png"
                style={{
                    width: `${props.width}px`,
                    height: `${props.height}px`
                }}
            />
    )
}