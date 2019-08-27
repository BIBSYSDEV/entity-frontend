import React from 'react';
import Header from './Header';
import { Grid } from '@material-ui/core';
import RegistryList from './RegistryList';

const RegistryPresentation = ({ user, registries, setAuthorised, setApiKey }): any => {

    return (
        <div>
            <Header 
                spinner={false} 
                user={user} 
                setAuthorised={setAuthorised}
            />
            <Grid container justify={'center'} spacing={8}>
                <Grid item sm={9}>
                    <RegistryList 
                        registries={registries} 
                        setApiKey={setApiKey}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default RegistryPresentation;
