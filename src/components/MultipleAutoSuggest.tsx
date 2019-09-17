import React, { useState, useEffect } from 'react';
import AutoSuggest from './AutoSuggest';
import ChipLabel from './ChipLabel';
import { getUniqueItemsInArray } from '../utils';
import { EMPTY } from '../constants';

interface MultipleAutoSuggestProps {
	data: any;
	handleChange: (path: string, value: any) => void;
	label: string;
	path: string;
	registryName: string;
}

const MultipleAutoSuggest: React.FC<MultipleAutoSuggestProps> = props => {
	const { data, handleChange, label, path, registryName } = props;

	const [tempLabel, setTempLabel] = useState(EMPTY);
	const [listOfIds, setListOfIds] = useState<string[]>([]);

	useEffect(() => {
		if (data) {
			setListOfIds(data);
		}
	}, [data]);

	const handleClick = (suggestion: string) => {
		let list = listOfIds;
		list.push(suggestion);
		const listOfUniqueIds = getUniqueItemsInArray(list);

		setListOfIds(listOfUniqueIds);
		setTempLabel(EMPTY);
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
			{listOfIds && listOfIds.map(id => <ChipLabel id={id} key={id} onDelete={handleDelete} />)}
		</div>
	);
};

export default MultipleAutoSuggest;
