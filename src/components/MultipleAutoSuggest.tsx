import React, { useState, useEffect } from 'react';
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
	const [listOfLabels, setListOfLabels] = useState<string[]>([]);

	useEffect(() => {
		if (data) {
			setListOfLabels(data);
		}
	}, [data]);

	const handleDelete = (event: any, label: string) => {
		const newList = listOfLabels.filter(item => {
			return item !== label;
		});

		setListOfLabels(newList);
	};

	return (
		<div style={{ paddingBottom: '1rem' }}>
			<AutoSuggest
				label={label}
				onChange={(value: string) => {
					setTempLabel(value);
				}}
				onClick={label => {
					listOfLabels.push(label);
					setTempLabel('');
					handleChange(path, listOfLabels);
				}}
				registryName={registryName}
				value={tempLabel}
			/>
			{listOfLabels && <LabelList handleDelete={handleDelete} listOfLabels={listOfLabels} />}
		</div>
	);
};

export default MultipleAutoSuggest;

interface LabelListProps {
	handleDelete: (event: any, label: string) => void;
	listOfLabels: string[];
}

export const LabelList: React.FC<LabelListProps> = ({ handleDelete, listOfLabels }) => {
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
					<Chip
						className={classes.chip}
						label={label}
						key={label}
						onDelete={event => handleDelete(event, label)}
					/>
				))}
		</React.Fragment>
	);
};
