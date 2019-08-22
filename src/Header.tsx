import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './Unit ikon farge.png';
import { Button } from '@material-ui/core';
import { EMPTY } from './constants';
import './Header.css';

export interface HeaderProps {
    spinner: boolean;
    user: string;
    setAuthorised(authorised: boolean): void;
}

const Header = (props: HeaderProps): any => {
    const { spinner, user, setAuthorised } = props;

    const handleLogout = (): void => {
        setAuthorised(false);
    }

    const ChangePasswordButton = withRouter(
        ({history}: any) => (
            Boolean(user) ?
                <Button onClick={() => history.push("/ChangePassword")}>Change Password</Button>
                : <div />
        )); 
 
    const showLogoutButton = (): any => {
        const buttonRender = (Boolean(user)) ? <Button onClick={handleLogout} color="inherit">Logout</Button> : EMPTY; 
        return  (buttonRender);
    }
    
    return (
        <div className='header_root'>
            <AppBar position="static" color="default">
                <Toolbar variant="dense">
                    {spinner ? 
                        <img src={logo} className='header_logoSpin' alt="logo"/> : 
                        <img src={logo} className='header_logoStill' alt="logo"/> 
                    } 
                    <Typography className='header_title' variant="h4" color="inherit" align="center">
                        Emneregister demo
                    </Typography>
                    <Typography variant="h6">
                        {user}
                        <ChangePasswordButton/> 
                        {showLogoutButton()} 
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;

