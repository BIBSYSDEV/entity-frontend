import React, { useState, useEffect } from 'react';
import AutoSuggest from './AutoSuggest';
import ChipLabel from './ChipLabel';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { getUniqueItemsInArray } from '../utils';

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
	const [listOfIds, setListOfIds] = useState<string[]>([]);

	useEffect(() => {
		if (data) {
			setListOfIds(data);
		}
	}, [data]);

	const handleClick = (suggestion: string) => {
		listOfIds.push(suggestion);
		setTempLabel('');
		const listOfUniqueIds = getUniqueItemsInArray(listOfIds);
		setListOfIds(listOfUniqueIds);
		handleChange(path, listOfUniqueIds);
	};

	const handleDelete = (_: any, id: string) => {
		const newList = listOfIds.filter(item => {
			return item !== id;
		});

		setListOfIds(newList);
		handleChange(path, newList);
	};

	return (
		<div style={{ paddingBottom: '1rem' }}>
			<AutoSuggest
				label={label}
				onChange={(value: string) => {
					setTempLabel(value);
				}}
				onClick={handleClick}
				registryName={registryName}
				value={tempLabel}
			/>
			{listOfIds && <LabelList handleDelete={handleDelete} listOfIds={listOfIds} />}
		</div>
	);
};

export default MultipleAutoSuggest;

interface LabelListProps {
	handleDelete: (event: any, id: string) => void;
	listOfIds: string[];
}

export const LabelList: React.FC<LabelListProps> = ({ handleDelete, listOfIds }) => {
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
			{listOfIds &&
				listOfIds.map(id => (
					<ChipLabel
						classes={classes}
						id={id}
						key={id}
						onDelete={(event: any) => handleDelete(event, id)}
					/>
				))}
		</React.Fragment>
	);
};
