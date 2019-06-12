import React, { useState } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import './App.css';
import Login from './Login';
import EntityRegistrationApp from './EntityRegistrationApp';
import RegistryPresentation from './RegistryPresentation';
import ChangePassword from './ChangePassword';

const styles = createStyles({
    toolBar: {
        flexGrow: 1,
    },
    container: {
        padding: '1em'
    },
    title: {
        textAlign: 'center',
        padding: '0.25em'
    },
    dataContent: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0.25em',
        backgroundColor: '#cecece',
    },
    demoform: {
        margin: 'auto'
    },
    grow: {
        flexGrow: 1,
    },
    toolBarTitle: {
        padding: '0 30px',
        margin: '1em',
    }

});

const App = () => {
    
    const [isAuthorised, setAuthorised] = useState(sessionStorage.getItem('authorised') || '');

    React.useEffect(() => {
        sessionStorage.setItem('authorised', isAuthorised);
    }, [isAuthorised])

    const [user, setUser] = useState(sessionStorage.getItem('user') || '');

    React.useEffect(() => {
        sessionStorage.setItem('user', user);
    }, [user])

    const [registryId, setRegistryId] = useState(sessionStorage.getItem('registry') || '');

    React.useEffect(() => {
        sessionStorage.setItem('registry', registryId);
    }, [registryId])

    const [changePassword, setChangePassword] = useState(false);

    const chooseRegistry = () => {
        setRegistryId('');
    }

    let appRender = <Login 
        setAuthorised={setAuthorised} 
        setUser={setUser}
        user={''}
        setChangePassword={setChangePassword} 
    />;

    if(changePassword){
        appRender = <ChangePassword
            user={user}
            setChangePassword={setChangePassword}
        />
    }

    if(isAuthorised && !changePassword) {
        (!Boolean(registryId) || !Boolean) ?
            appRender = <RegistryPresentation 
                setRegistryId={setRegistryId}
                user={user}
                setChangePassword={setChangePassword} 
            /> :
            appRender = <EntityRegistrationApp 
                registryId={registryId}
                setRegistryId={setRegistryId} 
                setAuthorised={setAuthorised} 
                chooseRegistry={chooseRegistry} 
                user={user}
                setChangePassword={setChangePassword}
            />;
    }

    return appRender;
}

export default withStyles(styles)(App);

