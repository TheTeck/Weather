import React from 'react';

import './SubHeader.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';

export default function SubHeader ({ name, temp, icon}) {
    return (
        <div id="subheader-container">
            <DynamicIcon width={40} height={40} />
            <div>{`${temp}\u00B0`}</div>
            <div id="subheader-name">{name}</div>
        </div>
    )
}