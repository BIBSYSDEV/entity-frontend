import React, { useState } from 'react';
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
	onClick?: (id: string) => void;
	placeholder?: string;
	registryName: string;
	value: string;
}

const AutoSuggest: React.FC<AutoSuggestProps> = ({
	label,
	onChange,
	onClick,
	placeholder,
	registryName,
	value
}) => {
	const classes = useStyles();

	const [inputText, setInputText] = useState(value || '');
	const [suggestions, setSuggestions] = React.useState<OptionType[]>([]);

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

	const handleChange = () => (
		event: React.ChangeEvent<{}>,
		{ newValue }: Autosuggest.ChangeEvent
	) => {
		setInputText(newValue);
	};

	const handleSuggestionSelected = (
		event: React.FormEvent<any>,
		data: SuggestionSelectedEventData<any>
	) => {
		onChange(data.suggestion.id);
		if (onClick) {
			onClick(data.suggestion.id);
			setInputText('');
		}
	};

	const autosuggestProps = {
		renderInputComponent,
		suggestions,
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
					value: inputText,
					onChange: handleChange()
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
