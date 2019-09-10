import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import AutoSuggest from './AutoSuggest';

interface SearchFieldProps {
	data: any;
	handleChange: (path: string, value: any) => void;
	path: string;
}

const SearchField = ({ data, handleChange, path }: SearchFieldProps) => (
	<AutoSuggest
		label="narrower"
		onChange={(value: string) => handleChange(path, value)}
		value={data}
	/>
);

export default withJsonFormsControlProps(SearchField);
