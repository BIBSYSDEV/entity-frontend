import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';

interface ChipLabelProps {
	classes: any;
	id: string;
	onDelete: (event: any, id: string) => void;
}

const ChipLabel: React.FC<ChipLabelProps> = ({ classes, id, onDelete }) => {
	const [label, setLabel] = useState('');

	useEffect(() => {
		getLabelForId(id);
	}, [id]);

	const getLabelForId = async (id: string) => {
		return await fetch(id, {
			headers: {
				Accept: 'application/ld+json'
			}
		}).then(data =>
			data.json().then(data => {
				setLabel(data.preferredLabel[0].value || '');
			})
		);
	};

	return (
		<Chip
			className={classes.chip}
			label={label}
			onDelete={(event: any) => onDelete(event, id)}
		/>
	);
};

export default ChipLabel;
