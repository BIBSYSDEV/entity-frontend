import React from 'react';
import MultipleAutoSuggest from './MultipleAutoSuggest';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withJsonFormsControlProps } from '@jsonforms/react';

interface RelatedProps {
	data: any;
	handleChange: (path: string, value: any) => void;
	path: string;
}

const Related: React.FC<RelatedProps & RouteComponentProps<any>> = ({
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
			label="Related"
			path={path}
			registryName={registryName}
		/>
	);
};

const RelatedComponent = compose(
	withRouter,
	withJsonFormsControlProps
)(Related);

export default RelatedComponent;
