import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import AutoSuggest from './AutoSuggest';
import { compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface SearchFieldProps {
	data: any;
	handleChange: (path: string, value: any) => void;
	path: string;
}

const SearchFieldWithAutoSuggest: React.FC<SearchFieldProps & RouteComponentProps<any>> = props => {
	const { data, handleChange, path } = props;
	const registryName = props.match.params.registryName;

	return (
		<AutoSuggest
			label="Narrower"
			onChange={(value: string) => handleChange(path, value)}
			registryName={registryName}
			value={data}
		/>
	);
};

const SearchField = compose(
	withRouter,
	withJsonFormsControlProps
)(SearchFieldWithAutoSuggest);

export default SearchField;
