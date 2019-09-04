import React from 'react';
import TextField from '@material-ui/core/TextField';

interface SearchFieldProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ onChange }) => {
	return (
		<TextField
			variant="outlined"
			margin="normal"
			name="search"
			label="Search"
			type="search"
			id="search"
			autoFocus
			onChange={onChange}
		/>
	);
};

export default SearchField;
