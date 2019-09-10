import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import AutoSuggest from './AutoSuggest';
import { compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface NarrowerProps {
	data: any;
	handleChange: (path: string, value: any) => void;
	path: string;
}

const Narrower: React.FC<NarrowerProps & RouteComponentProps<any>> = ({
	data,
	handleChange,
	match,
	path
}) => {
	const registryName = match.params.registryName;

	return (
		<div style={{ paddingBottom: '1rem' }}>
			<AutoSuggest
				label="Narrower"
				onChange={(value: string) => handleChange(path, value)}
				registryName={registryName}
				value={data}
			/>
		</div>
	);
};

const NarrowerComponent = compose(
	withRouter,
	withJsonFormsControlProps
)(Narrower);

export default NarrowerComponent;
