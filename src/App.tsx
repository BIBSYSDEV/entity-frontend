import React, { useState } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import './App.css';
import Login from './Login';
import EntityRegistrationApp from './EntityRegistrationApp';
import RegistryPresentation from './RegistryPresentation';
import ChangePassword from './ChangePassword';
import Amplify from '@aws-amplify/core';
import config from './config';


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

Amplify.configure(config);

const App = (): any => {
    
    const [isAuthorised, setAuthorised] = useState(sessionStorage.getItem('authorised') || '');

    React.useEffect((): void => {
        sessionStorage.setItem('authorised', isAuthorised);
    }, [isAuthorised])

    const [registries, setRegistries] = useState(sessionStorage.getItem('registries') || '');
    React.useEffect((): void => {
        sessionStorage.setItem('registries', registries);
    }, [registries])

    const [user, setUser] = useState(sessionStorage.getItem('user') || '');

    React.useEffect((): void => {
        sessionStorage.setItem('user', user);
    }, [user])

    const [registryId, setRegistryId] = useState(sessionStorage.getItem('registry') || '');

    React.useEffect((): void => {
        sessionStorage.setItem('registry', registryId);
    }, [registryId])

    const [apiKey, setApiKey] = useState(sessionStorage.getItem('apiKey') || '');

    React.useEffect((): void => {
        sessionStorage.setItem('apiKey', apiKey);
    }, [apiKey])
    
    
    const [changePassword, setChangePassword] = useState(false);

    const chooseRegistry = (): void => {
        setRegistryId('');
    }

    
    const loginPage = 
        <Login 
            setAuthorised={setAuthorised} 
            setUser={setUser}
            user={''}
            setChangePassword={setChangePassword} 
            setRegistries={setRegistries}
            chooseRegistry={chooseRegistry}
        />;
    
    const changePasswordPage = 
        <ChangePassword
            user={user}
            setChangePassword={setChangePassword}
            setAuthorised={setAuthorised}
            chooseRegistry={chooseRegistry}
        />;
    
    const registryPresentationPage = 
        <RegistryPresentation 
            setRegistryId={setRegistryId}
            user={user}
            setChangePassword={setChangePassword}
            registries={registries}
            setAuthorised={setAuthorised}
            chooseRegistry={chooseRegistry}
            setApiKey={setApiKey}
        />;
    
    const entityRegistrationPage = 
        <EntityRegistrationApp 
            registryId={registryId}
            user={user}
            registries={registries}
            setRegistryId={setRegistryId} 
            setAuthorised={setAuthorised} 
            chooseRegistry={chooseRegistry} 
            setChangePassword={setChangePassword}
        />;
    
    let pageSelected = loginPage;

    if(changePassword){
        pageSelected = changePasswordPage;
    }

    if(Boolean(isAuthorised) && !changePassword) {
        pageSelected = (!Boolean(registryId)) ?
            registryPresentationPage :
            entityRegistrationPage;
    }

    return pageSelected;
}

export default withStyles(styles)(App);

