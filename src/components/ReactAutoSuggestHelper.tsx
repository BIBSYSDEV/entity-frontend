import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { API } from 'aws-amplify';
import { getNorwegianLabelFirst } from '../utils';

export interface OptionType {
	label: string;
}

export function renderInputComponent(inputProps: any) {
	const { classes, inputRef = () => {}, ref, ...other } = inputProps;

	return (
		<TextField
			fullWidth
			InputProps={{
				inputRef: node => {
					ref(node);
					inputRef(node);
				},
				classes: {
					input: classes.input
				}
			}}
			{...other}
		/>
	);
}

export const performSearch = async (query: string, registryName: string) => {
	let response = await API.get(
		'entity',
		'/registry/' + registryName + '/search?query=' + query,
		null
	);
	const results = response.map((item: any) => {
		const label = getNorwegianLabelFirst(item.preferredLabel);
		return {
			id: item.id,
			label
		};
	});
	return results;
};

export function renderSuggestion(
	suggestion: OptionType,
	{ query, isHighlighted }: Autosuggest.RenderSuggestionParams
) {
	const matches = match(suggestion.label, query);
	const parts = parse(suggestion.label, matches);

	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map(part => (
					<span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
						{part.text}
					</span>
				))}
			</div>
		</MenuItem>
	);
}

export function getSuggestionValue(suggestion: OptionType) {
	return suggestion.label;
}

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 50,
			flexGrow: 1
		},
		container: {
			position: 'relative'
		},
		suggestionsContainerOpen: {
			position: 'absolute',
			zIndex: 1,
			marginTop: theme.spacing(1),
			left: 0,
			right: 0
		},
		suggestion: {
			display: 'block'
		},
		suggestionsList: {
			margin: 0,
			padding: 0,
			listStyleType: 'none'
		},
		divider: {
			height: theme.spacing(2)
		}
	})
);
