import React, { useState } from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Header from './Header';
import { Grid } from '@material-ui/core';
import EntityRegistrationForm from './EntityRegistrationForm';
import EntityDataPresentation from './EntityDataPresentation';
import { JsonFormsState, getData } from '@jsonforms/core';
import { connect } from 'react-redux';

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
}

const EntityRegistrationApp = (props: DataProps) => {

    const { classes, registryId, setAuthorised, chooseRegistry, user, setChangePassword, data, setRegistryId, registries } = props;
    
    const handleNew = () => {
        // new 
    }

    const [ spinner, setSpinner] = useState(false);

    const handlePersist = () => {
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 5000);
    }

    const findEntityIdentifierInPath = () => {
        const pathElements: string[] = window
            .location
            .pathname
            .substring(1)
            .split("/");
        return pathElements.length > 1 ? 
            pathElements[1] :
            '';
    }
    const identifier = findEntityIdentifierInPath();
    if(Boolean(identifier)){
        (data as any)["identifier"] = Boolean(identifier) ? identifier : (data as any)["identifier"];
    }

    const findRegistryIdentifierInPath = () => {
        return window
            .location
            .pathname
            .substring(1)
            .split("/")[0];
    }

    const registryName = findRegistryIdentifierInPath();
    
    if(Boolean(registryName) && JSON.parse(registries).includes(registryName)){
        setRegistryId(registryName);
    }


    return (
        <div>
            <Header spinner={spinner} user={user} setChangePassword={setChangePassword}/>
            <Grid container justify={'center'} spacing={8} className={classes.container}>
                <Grid item sm={9}>
                    <EntityRegistrationForm
                        registryId={registryId}
                        handleNew={handleNew}
                        handlePersist={handlePersist}
                        setAuthorised={setAuthorised}
                        chooseRegistry={chooseRegistry}
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

export default connect(mapStateToProps)(withStyles(styles)(EntityRegistrationApp));
