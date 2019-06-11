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
    setRegistryId(registryId: string): void;
    setChangePassword(changePassword: boolean): void;
}

const RegistryPresentation = (props: DataProps) => {

    const { classes, setRegistryId, user, setChangePassword } = props;

    const findRegistryIdentifierInPath = () => {
        return window
            .location
            .pathname
            .substring(1)
            .split("/")[0];
    }

    const registryName = findRegistryIdentifierInPath();
    setRegistryId(registryName);
    
    return (
        <div>
            <Header 
                spinner={false} 
                user={user} 
                setChangePassword={setChangePassword}
            />
            <Grid container justify={'center'} spacing={8} className={classes.container}>
                <Grid item sm={9}>
                    <RegistryList setRegistryId={setRegistryId} />
                </Grid>
            </Grid>
        </div>
    );

}

export default  withStyles(styles)(RegistryPresentation);
