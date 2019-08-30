import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Grid } from '@material-ui/core';
import EntityRegistrationForm from './EntityRegistrationForm';
import EntityDataPresentation from './EntityDataPresentation';
import { JsonFormsState, getData } from '@jsonforms/core';
import { connect } from 'react-redux';
import { writeEntity, readEntity } from './utils';

export interface DataProps {
    registryId: string;    
    user: string;
    data: object;
    setAuthorised(authorised: boolean): void;
    newEntity(registryName: string): void;
    apiKey: string;
    entityId: string;
    initStore(body: any): any;
    history: any;
}

const EntityRegistrationApp = (props: DataProps) => {

    const { registryId, setAuthorised, user, data, newEntity, apiKey, entityId, initStore, history } = props;
    
    const [status, setStatus] = useState('');

    const handleNew = (): void => {
        newEntity(registryId);
        history.push(`/${registryId}`);
        setStatus(`New entity`);
    }

    useEffect (() => {

        if (Boolean(entityId)) {
            readEntity(registryId, entityId).then((entityData: any): void => {
                entityData && initStore(entityData);
                setStatus(`${entityId} loaded...`);
            });
        }
    }, [entityId]);
    const [ spinner, setSpinner] = useState(false);

    const handlePersist = (): void => {
        setSpinner(true);
        writeEntity(registryId, entityId, apiKey, data).then(() => {
            setStatus(`${entityId} saved...`);
            setSpinner(false);
        })
    }

    return (
        <div>
            <Header 
                spinner={spinner} 
                user={user} 
                setAuthorised={setAuthorised}
            />
            
            <Grid container justify={'center'} spacing={8}>
                <Grid item sm={9}>
                    <EntityRegistrationForm
                        registryId={registryId}
                        handleNew={handleNew}
                        handlePersist={handlePersist}
                        status={status}
                    />
                </Grid>
                <Grid item sm={9}>
                    <EntityDataPresentation
                        dataAsString={JSON.stringify(data, null, 2)}
                    />                                    
                </Grid>
            </Grid>
        </div>
    );

}

const mapStateToProps = (state: JsonFormsState) => {
    return { data: getData(state) }
};

export default connect(mapStateToProps)(EntityRegistrationApp);
