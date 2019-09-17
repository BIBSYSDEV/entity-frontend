import React, { useState, useEffect } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import AutoSuggest from './AutoSuggest';
import ChipLabel from './ChipLabel';
import { EMPTY } from '../constants';

interface BroaderProps {
	data: any;
	handleChange: (path: string, value: any) => void;
	path: string;
}

const Broader: React.FC<BroaderProps & RouteComponentProps<any>> = ({ data, handleChange, match, path }) => {
	const registryName = match.params.registryName;

	const [tempLabel, setTempLabel] = useState(EMPTY);
	const [id, setId] = useState(EMPTY);
	const [searchForLabel, setSearchForLabel] = useState(false);

	useEffect(() => {
		if (data) {
			setId(data.toString());
		} else {
			setId(EMPTY);
		}
	}, [data]);

	useEffect(() => {
		if (id) {
			setSearchForLabel(true);
		} else {
			setSearchForLabel(false);
		}
	}, [id]);

	const handleClick = (id: string) => {
		setId(id);
		setTempLabel(EMPTY);
		setSearchForLabel(true);
		handleChange(path, id);
	};

	const handleDelete = (_: any) => {
		setId(EMPTY);
		setSearchForLabel(false);
		handleChange(path, EMPTY);
	};

	return (
		<div style={{ paddingBottom: '1rem' }}>
			{searchForLabel ? (
				<React.Fragment>
					<Typography>Broader</Typography>
					<ChipLabel id={id} onDelete={handleDelete} />
				</React.Fragment>
			) : (
				<AutoSuggest
					label="Broader"
					onChange={(value: string) => setTempLabel(value)}
					onClick={handleClick}
					registryName={registryName}
					value={tempLabel}
				/>
			)}
		</div>
	);
};

const BroaderComponent = compose(
	withRouter,
	withJsonFormsControlProps
)(Broader);

export default BroaderComponent;
