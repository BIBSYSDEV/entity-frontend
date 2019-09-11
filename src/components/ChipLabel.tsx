import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { EMPTY } from '../constants';
import { getNorwegianLabelFirst } from '../utils';

interface ChipLabelProps {
	id: string;
	onDelete: (event: any, id: string) => void;
}

const ChipLabel: React.FC<ChipLabelProps> = ({ id, onDelete }) => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			chip: {
				margin: theme.spacing(1)
			}
		})
	);

	const classes = useStyles();

	const [label, setLabel] = useState(EMPTY);

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
				setLabel(getNorwegianLabelFirst(data.preferredLabel) || EMPTY);
			})
		);
	};

	return (
		<Chip className={classes.chip} label={label} onDelete={(event: any) => onDelete(event, id)} />
	);
};

export default ChipLabel;
