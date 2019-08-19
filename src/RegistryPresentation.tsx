import React from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Header from './Header';
import { Grid } from '@material-ui/core';
import RegistryList from './RegistryList';

const styles = createStyles({
    container: {
        padding: '1em'
    },
});

export interface DataProps extends WithStyles<typeof styles> {
    user: string;
    registries: string;
    setAuthorised(authorised: boolean): void;
    setApiKey(apiKey: string): void;
}

const RegistryPresentation = (props: DataProps): any => {

    const { classes, user, registries, setAuthorised, setApiKey } = props;

    return (
        <div>
            <Header 
                spinner={false} 
                user={user} 
                setAuthorised={setAuthorised}
            />
            <Grid container justify={'center'} spacing={8} className={classes.container}>
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

export default  withStyles(styles)(RegistryPresentation);
