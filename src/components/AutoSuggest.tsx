import React from 'react';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';

import {
	useStyles,
	OptionType,
	getSuggestionValue,
	renderInputComponent,
	renderSuggestion,
	performSearch
} from './ReactAutoSuggestHelper';
import { Paper } from '@material-ui/core';

interface AutoSuggestProps {
	label: string;
	onChange: (value: string) => void;
	placeholder?: string;
	registryName: string;
	value: string;
}

const AutoSuggest: React.FC<AutoSuggestProps> = ({
	label,
	onChange,
	placeholder,
	registryName,
	value
}) => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		single: value || '',
		popper: ''
	});
	const [stateSuggestions, setSuggestions] = React.useState<OptionType[]>([]);

	const handleSuggestionsFetchRequested = ({ value }: any) => {
		onChange(value);
		if (value.length > 2) {
			performSearch(value, registryName).then(data => {
				setSuggestions(data);
			});
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const handleChange = (name: keyof typeof state) => (
		event: React.ChangeEvent<{}>,
		{ newValue }: Autosuggest.ChangeEvent
	) => {
		setState({
			...state,
			[name]: newValue
		});
	};

	const handleSuggestionSelected = (
		event: React.FormEvent<any>,
		data: SuggestionSelectedEventData<any>
	) => {
		onChange(data.suggestionValue);
	};

	const autosuggestProps = {
		renderInputComponent,
		suggestions: stateSuggestions,
		onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
		onSuggestionsClearRequested: handleSuggestionsClearRequested,
		onSuggestionSelected: handleSuggestionSelected,
		getSuggestionValue,
		renderSuggestion
	};

	return (
		<div className={classes.root}>
			<Autosuggest
				{...autosuggestProps}
				inputProps={{
					classes,
					id: 'react-autosuggest-simple',
					label,
					placeholder,
					value: state.single,
					onChange: handleChange('single')
				}}
				theme={{
					container: classes.container,
					suggestionsContainerOpen: classes.suggestionsContainerOpen,
					suggestionsList: classes.suggestionsList,
					suggestion: classes.suggestion
				}}
				renderSuggestionsContainer={options => (
					<Paper {...options.containerProps} square>
						{options.children}
					</Paper>
				)}
			/>
			<div className={classes.divider} />
		</div>
	);
};

export default AutoSuggest;
