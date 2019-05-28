import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './Unit ikon farge.png';

const styles = createStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        padding: '0 30px',
        margin: '1em',
        marginLeft: '10em',
    },
    logoStill: {
          height: '80px',
          animation: '',
    },
    logoSpin: {
          height: '80px',
          animation: 'App-logo-spin infinite 4s linear',
    },
});

export interface HeaderProps extends WithStyles<typeof styles> {
    spin: boolean;
    user: string;
}

const Header = (props: HeaderProps) => {
    const { classes, spin, user } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar variant="dense">
                    {spin ? 
                        <img src={logo} className={classes.logoSpin} alt="logo"/> : 
                        <img src={logo} className={classes.logoStill} alt="logo"/> 
                    } 
                    <Typography className={classes.title} variant="h4" color="inherit" align="center">
                        Emneregister demo
                    </Typography>
                    <Typography variant="h6">
                        {user}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);

