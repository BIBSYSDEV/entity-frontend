import React from 'react';
import MultipleAutoSuggest from './MultipleAutoSuggest';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withJsonFormsControlProps } from '@jsonforms/react';

interface BroaderProps {
	data: any;
	handleChange: (path: string, value: any) => void;
	path: string;
}

const Broader: React.FC<BroaderProps & RouteComponentProps<any>> = ({
	data,
	handleChange,
	match,
	path
}) => {
	const registryName = match.params.registryName;
	return (
		<MultipleAutoSuggest
			data={data}
			handleChange={handleChange}
			label="Broader"
			path={path}
			registryName={registryName}
		/>
	);
};

const BroaderComponent = compose(
	withRouter,
	withJsonFormsControlProps
)(Broader);

export default BroaderComponent;
