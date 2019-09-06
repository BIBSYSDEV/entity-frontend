import React from 'react';
import './AppStatus.css';

const AppStatus = ({status}: {status: string}): any => {
    return (<div style={{
        fontSize: '20px',
        color: '#aaaaaa',
        padding: '0.5em'
    }}>{status}</div>)
}

export default AppStatus;