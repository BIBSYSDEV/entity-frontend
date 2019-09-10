import React, { useState } from 'react';
import AutoSuggest from './AutoSuggest';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

interface MultipleAutoSuggestProps {
	data: any;
	handleChange: (path: string, value: any) => void;
	label: string;
	path: string;
	registryName: string;
}

const MultipleAutoSuggest: React.FC<MultipleAutoSuggestProps> = props => {
	const { data, handleChange, label, path, registryName } = props;

	const [tempLabel, setTempLabel] = useState('');

	let listOfLabels: string[] = [];
	if (data) {
		listOfLabels = data;
	}

	return (
		<div style={{ paddingBottom: '1rem' }}>
			<AutoSuggest
				label={label}
				onChange={(value: string) => {
					setTempLabel(value);
				}}
				onClick={label => {
					listOfLabels.push(label);
					handleChange(path, listOfLabels);
				}}
				registryName={registryName}
				value={tempLabel}
			/>
			{listOfLabels && <LabelList listOfLabels={listOfLabels} />}
		</div>
	);
};

export default MultipleAutoSuggest;

interface LabelListProps {
	listOfLabels: string[];
}

export const LabelList: React.FC<LabelListProps> = ({ listOfLabels }) => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			chip: {
				margin: theme.spacing(1)
			}
		})
	);

	const classes = useStyles();

	return (
		<React.Fragment>
			{listOfLabels &&
				listOfLabels.map(label => (
					<Chip className={classes.chip} label={label} key={label} />
				))}
		</React.Fragment>
	);
};
