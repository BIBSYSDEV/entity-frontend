import React from 'react';
import { Grid } from '@material-ui/core';
import RegistryList from './RegistryList';

export interface DataProps {
	registries: string;
	setApiKey(apiKey: string): void;
}

const RegistryPresentation = (props: DataProps): any => {
	const { registries, setApiKey } = props;

	return (
		<div>
			<Grid container justify={'center'} spacing={8}>
				<Grid item sm={9}>
					<RegistryList registries={registries} setApiKey={setApiKey} />
				</Grid>
			</Grid>
		</div>
	);
};

export default RegistryPresentation;
