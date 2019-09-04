import React from 'react';
import './AppStatus.css';

interface AppStatusProps {
	status: string;
}

const AppStatus: React.FC<AppStatusProps> = ({ status }) => (
	<div
		style={{
			fontSize: '20px',
			color: '#aaaaaa',
			padding: '0.5em'
		}}
	>
		{status}
	</div>
);

export default AppStatus;
