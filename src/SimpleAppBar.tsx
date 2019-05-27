import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './Unit ikon farge.png';

const styles = {
    root: {
        flexGrow: 1,
    },
    title: {
        padding: '0 30px',
        margin: '1em',
        marginLeft: '10em',
    }
};


const SimpleAppBar = (props: any) => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar variant="dense">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <Typography className={classes.title} variant="h4" color="inherit" align="center">
            Emneregister demo
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);

