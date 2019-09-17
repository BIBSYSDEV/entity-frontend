import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import {
	ListItem,
	ListItemText,
	Collapse,
	Typography,
	Card,
	CardContent,
	Link,
	InputLabel,
	Box,
	Button,
} from '@material-ui/core';

import { ResultType } from './SearchResults';
import { LINK } from './constants';

const resultPresentationConfig: any = {
	title: ['preferredLabel', 'alternativeLabel', 'id'],
	visibleAttributes: {
		preferredLabel: {
			type: 'textArray',
			label: 'Preferred label:',
		},
		definition: {
			type: 'text',
			label: 'Definition:',
		},
		alternativeLabel: {
			type: 'textArray',
			label: 'Alternative label:',
		},
		narrower: {
			type: 'link',
			label: 'Narrower:',
		},
		broader: {
			type: 'link',
			label: 'Broader:',
		},
		sameAs: {
			type: 'link',
			label: 'Same as:',
		},
		seeAlso: {
			type: 'link',
			label: 'See also:',
		},
		related: {
			type: 'link',
			label: 'Related:',
		},
	},
};

export interface ResultProps {
	result: ResultType;
	registryName: string;
}

const ResultPresentation = (props: ResultProps): any => {
	const { result, registryName } = props;

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const namespacePattern = 'registry/' + registryName + '/entity';

	const processLink = (value: string) => {
		const linkId = value.split('/').pop();
		if (value.indexOf(namespacePattern) > 0) {
			return '/' + registryName + '/Search/' + linkId;
		}
		return value;
	};

	const renderLink = (key: string, value: any): any => {
		return (
			<Typography>
				<InputLabel shrink>{key}</InputLabel>
				{Array.isArray(value) ? (
					(value as any[]).map((element: string) => (
						<Typography>
							<Link href={processLink(element)}>{element}</Link>
						</Typography>
					))
				) : value === Object(value) ? (
					<Typography>
						<Link href={'/'.concat(registryName, '/Search/', value['value'])}>{value['value']}</Link>
					</Typography>
				) : (
					<Typography>
						<Link href={'/'.concat(registryName, '/Search/', value)}>{value}</Link>
					</Typography>
				)}
			</Typography>
		);
	};

	const renderSingleLine = (key: string, value: any): any => {
		return (
			<Typography>
				<InputLabel shrink>{key}</InputLabel>
				<Typography>{Boolean(value['value']) ? value['value'] + ' (' + value['language'] + ')' : value}</Typography>
			</Typography>
		);
	};

	const renderText = (key: string, value: any): any => {
		if (Array.isArray(value)) {
			let index = 0;
			return value.map((element: any) => {
				if (index > 0) {
					key = '';
				}
				index++;
				return renderSingleLine(key, element);
			});
		} else {
			return renderSingleLine(key, value);
		}
	};

	const renderAttribute = (key: string, attribute: any): string => {
		if (Boolean(resultPresentationConfig.visibleAttributes[key])) {
			if (resultPresentationConfig.visibleAttributes[key].type === LINK) {
				return renderLink(resultPresentationConfig.visibleAttributes[key].label, attribute);
			} else {
				return renderText(resultPresentationConfig.visibleAttributes[key].label, attribute);
			}
		} else {
			return '';
		}
	};

	const attributes = Object.keys(result as any).map((key: string) => {
		const attribute = (result as any)[key];
		return renderAttribute(key, attribute);
	});

	const title = () => (result as any)['preferredLabel'][0]['value'];

	const id = () => result.id.split('/').pop();

	return (
		<Box>
			<ListItem button onClick={handleClick} key={result.id}>
				<ListItemText primary={title()} secondary={id()} />
				<Button>
					<RouteLink to={'/' + registryName + '/' + result.id.split('/').pop()}>Edit</RouteLink>
				</Button>
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<Card>
					<CardContent>{attributes}</CardContent>
				</Card>
			</Collapse>
		</Box>
	);
};

export default ResultPresentation;
