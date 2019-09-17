import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withJsonFormsControlProps } from '@jsonforms/react';

import MultipleAutoSuggest from './MultipleAutoSuggest';

interface NarrowerProps {
	data: any;
	handleChange: (path: string, value: any) => void;
	path: string;
}

const Narrower: React.FC<NarrowerProps & RouteComponentProps<any>> = ({ data, handleChange, match, path }) => {
	const registryName = match.params.registryName;
	return (
		<MultipleAutoSuggest
			data={data}
			handleChange={handleChange}
			label="Narrower"
			path={path}
			registryName={registryName}
		/>
	);
};

const NarrowerComponent = compose(
	withRouter,
	withJsonFormsControlProps
)(Narrower);

export default NarrowerComponent;
