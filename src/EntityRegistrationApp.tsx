import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import EntityRegistrationForm from './EntityRegistrationForm';
import EntityDataPresentation from './EntityDataPresentation';
import { JsonFormsState, getData } from '@jsonforms/core';
import { connect } from 'react-redux';
import { writeEntity, readEntity } from './utils';

export interface EntityRegistrationAppProps {
	user: string;
	data: object;
	setAuthorised(authorised: boolean): void;
	newEntity(registryName: string): void;
	apiKey: string;
	initStore(body: any): any;
}

const EntityRegistrationApp = (props: EntityRegistrationAppProps & any) => {
	const { data, newEntity, apiKey, initStore, history } = props;

	const registryName = props.computedMatch.params.registryName;
	const entityId = props.computedMatch.params.entityId;

	const [status, setStatus] = useState('');

	const handleNew = (): void => {
		newEntity(registryName);
		history.push(`/${registryName}`);
		setStatus(`New entity`);
	};

	useEffect(() => {
		if (entityId) {
			readEntity(registryName, entityId).then((entityData: any): void => {
				entityData && initStore(entityData);
				setStatus(`${entityId} loaded...`);
			});
		}
	}, [entityId, registryName, initStore]);

	const handlePersist = (): void => {
		writeEntity(registryName, entityId, apiKey, data).then(() => {
			setStatus(`${entityId} saved...`);
		});
	};

	return (
		<div>
			<Grid container justify={'center'} spacing={8}>
				<Grid item sm={9}>
					<EntityRegistrationForm
						registryId={registryName}
						handleNew={handleNew}
						handlePersist={handlePersist}
						status={status}
					/>
				</Grid>
				<Grid item sm={9}>
					<EntityDataPresentation dataAsString={JSON.stringify(data, null, 2)} />
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = (state: JsonFormsState) => {
	return { data: getData(state) };
};
export default connect(mapStateToProps)(EntityRegistrationApp);
