import React from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Header from './Header';
import { Grid } from '@material-ui/core';
import RegistryList from './RegistryList';
import { findRegistryIdentifierInPath, fetchApiKey } from './utils';

const styles = createStyles({
    container: {
        padding: '1em'
    },
});

export interface DataProps extends WithStyles<typeof styles> {
    user: string;
    setRegistryId(registryId: string): void;
    setChangePassword(changePassword: boolean): void;
    registries:string;
    setAuthorised(authorised: string): void;
    chooseRegistry(): void;
    setApiKey(apiKey: string): void;
}

const RegistryPresentation = (props: DataProps) => {

    const { classes, setRegistryId, user, setChangePassword, registries, setAuthorised, chooseRegistry, setApiKey } = props;

    const registryName = findRegistryIdentifierInPath();
    if(Boolean(registryName) && JSON.parse(registries).includes(registryName)) {
        fetchApiKey(registryName, setApiKey);
        setRegistryId(registryName);
    }
    
    return (
        <div>
            <Header 
                spinner={false} 
                user={user} 
                setChangePassword={setChangePassword}
                setAuthorised={setAuthorised}
                chooseRegistry={chooseRegistry}
            />
            <Grid container justify={'center'} spacing={8} className={classes.container}>
                <Grid item sm={9}>
                    <RegistryList 
                        setRegistryId={setRegistryId} 
                        registries={registries} 
                        setApiKey={setApiKey}
                    />
                </Grid>
            </Grid>
        </div>
    );

}

export default  withStyles(styles)(RegistryPresentation);
