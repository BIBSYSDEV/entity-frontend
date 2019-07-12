import React, { useState } from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Header from './Header';
import { Grid, Tabs, Tab } from '@material-ui/core';
import EntityRegistrationForm from './EntityRegistrationForm';
import EntityDataPresentation from './EntityDataPresentation';
import Search from './Search';
import { JsonFormsState, getData } from '@jsonforms/core';
import { connect } from 'react-redux';
import { findRegistryIdentifierInPath, writeEntity } from './utils';

const styles = createStyles({
    container: {
        padding: '1em'
    },
});

export interface DataProps extends WithStyles<typeof styles> {
    registryId: string;    
    user: string;
    data: object;
    registries: string;
    setRegistryId(registryId: string): void;
    setChangePassword(changePassword: boolean): void;
    setAuthorised(authorised: string): void;
    chooseRegistry(): void;
    newEntity(registryName: string): void;
    apiKey: string;
}

const EntityRegistrationApp = (props: DataProps) => {

    const { classes, registryId, setAuthorised, chooseRegistry, user, setChangePassword, data, setRegistryId, registries, newEntity, apiKey } = props;
    
    const handleNew = (): void => {
        newEntity(registryId);
    }

    const [ spinner, setSpinner] = useState(false);
    const [ tabValue, setTabValue] = useState(0);

    const handlePersist = (): void => {
        setSpinner(true);
        const result = writeEntity(registryId, (data as any)['identifier'], apiKey, data);
        console.log(result);
        setSpinner(false);
    }

    const registryName = findRegistryIdentifierInPath();
    
    if(Boolean(registryName) && JSON.parse(registries).includes(registryName)){
        setRegistryId(registryName);
    }

    const handleChange = (event: any, newValue: any) => {
        setTabValue(newValue);
      }

    return (
        <div>
            <Header 
                spinner={spinner} 
                user={user} 
                setChangePassword={setChangePassword}
                setAuthorised={setAuthorised}
                chooseRegistry={chooseRegistry}
            />
            
            <Tabs value={tabValue} onChange={handleChange}>
                <Tab label='Search' />
                <Tab label='Edit' />
            </Tabs>
            {tabValue === 0 && <Search />}
            {tabValue === 1 &&
            <Grid container justify={'center'} spacing={8} className={classes.container}>
                <Grid item sm={9}>
                    <EntityRegistrationForm
                        registryId={registryId}
                        handleNew={handleNew}
                        handlePersist={handlePersist}
                        chooseRegistry={chooseRegistry}
                    />
                </Grid>
                <Grid item sm={9}>
                    <EntityDataPresentation
                        dataAsString={JSON.stringify(data, null, 2)}
                    />                                    
                </Grid>
            </Grid>
            }
        </div>
    );

}

const mapStateToProps = (state: JsonFormsState) => {
    return { data: getData(state) }
};

export default connect(mapStateToProps)(withStyles(styles)(EntityRegistrationApp));
