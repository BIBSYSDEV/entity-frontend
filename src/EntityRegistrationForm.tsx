import React from 'react';
import { JsonFormsReduxContext, JsonFormsDispatch } from '@jsonforms/react';
import Typography from '@material-ui/core/Typography';
import EntityToolBar from './EntityToolBar';
import AppStatus from './AppStatus';

export interface EntityRegistrationFormProps {
	registryId: string;
	handleNew: () => void;
	handlePersist: () => void;
	status: string;
}

const EntityRegistrationForm: React.FC<EntityRegistrationFormProps> = ({
	registryId,
	handleNew,
	handlePersist,
	status
}) => (
	<React.Fragment>
		<Typography variant="h1">
			<EntityToolBar
				registryId={registryId}
				handleNew={handleNew}
				handlePersist={handlePersist}
			/>
			<AppStatus status={status} />
		</Typography>
		<div>
			<JsonFormsReduxContext>
				<JsonFormsDispatch />
			</JsonFormsReduxContext>
		</div>
		<Typography variant="h1">
			<EntityToolBar
				registryId={registryId}
				handleNew={handleNew}
				handlePersist={handlePersist}
			/>
		</Typography>
	</React.Fragment>
);

export default EntityRegistrationForm;
