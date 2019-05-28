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
    setRegistryId: object;
    user: string;
}

const RegistryPresentation = (props: DataProps) => {

    const { classes, setRegistryId, user } = props;
    
    return (
        <div>
            <Header spin={false} user={user}/>
            <Grid container justify={'center'} spacing={8} className={classes.container}>
                <Grid item sm={9}>
                    <RegistryList setRegistryId={setRegistryId} />
                </Grid>
            </Grid>
        </div>
    );

}

export default  withStyles(styles)(RegistryPresentation);
