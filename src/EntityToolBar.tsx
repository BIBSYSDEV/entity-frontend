import React from 'react';
import { withRouter } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import RegistryButton from './RegistryButton';

const styles = createStyles({
    toolBar: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
});

export interface AppProps extends WithStyles<typeof styles> {
    registryId: string;
    handleNew(): void;
    handlePersist(): void;
}

const EntityToolBar = (props: AppProps): any => {
    
    const { classes, registryId, handleNew, handlePersist } = props;

    const SearchButton = withRouter(
            ({history}: any) => (
                    <Button onClick={() => history.push("/" + registryId + "/Search")}>Search</Button>
                    )); 
    
    return (
        <div className={classes.toolBar}>
            <AppBar position="static" color="default">
                <Toolbar variant="dense">
                    <Typography className={classes.grow} variant="h6" color="inherit" align="left">
                    Emneord ({registryId})
                    </Typography>
                    <Button onClick={handleNew} color="inherit">New</Button>
                    <Button onClick={handlePersist} color="inherit">Save</Button>
                    <RegistryButton />
                    <SearchButton />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(EntityToolBar);
