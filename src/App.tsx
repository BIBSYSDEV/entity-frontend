import React, { useState, useEffect } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import './App.css';
import Login from './Login';
import EntityRegistrationApp from './EntityRegistrationApp';
import RegistryPresentation from './RegistryPresentation';
import ChangePassword from './ChangePassword';
import Amplify from '@aws-amplify/core';
import config from './config';
import { EMPTY } from './constants';

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

export interface AppProps {
    newEntity(registryName: string): void;
    data: any;
    setRegistryName(registryName: string): void;
    storeApiKey(apiKey: string): void;
} 

Amplify.configure(config);

const App = (props: AppProps): any => {

    const { newEntity, setRegistryName, storeApiKey } = props;
    const [registryId, setRegistryId] = useState(sessionStorage.getItem('registryId') || EMPTY);
    useEffect((): void => {
        setRegistryName(registryId);
    }, [registryId])

    const [apiKey, setApiKey] = useState(sessionStorage.getItem('apiKey') || EMPTY);
    useEffect((): void => {
        storeApiKey(apiKey);
    }, [registryId])

    const [isAuthorised, setAuthorised] = useState(sessionStorage.getItem('authorised') || EMPTY);

    useEffect((): void => {
        sessionStorage.setItem('authorised', isAuthorised);
    }, [isAuthorised])

    const [registries, setRegistries] = useState(sessionStorage.getItem('registries') || EMPTY);
    useEffect((): void => {
        sessionStorage.setItem('registries', registries);
    }, [registries])

    const [user, setUser] = useState(sessionStorage.getItem('user') as string || EMPTY);

    useEffect((): void => {
        sessionStorage.setItem('user', user);
    }, [user])
    


    
    const [changePassword, setChangePassword] = useState(false);

    const chooseRegistry = (): void => {
        setRegistryId(EMPTY);
    }

    const loginPage = 
        <Login 
            setAuthorised={setAuthorised} 
            setUser={setUser}
            user={EMPTY}
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
            setChangePassword={setChangePassword}
            setAuthorised={setAuthorised} 
            chooseRegistry={chooseRegistry}
            newEntity={newEntity}
            apiKey={apiKey}
        />;
    
    let pageSelected = loginPage;

    if(changePassword) {
        pageSelected = changePasswordPage;
    }else {
        if(Boolean(isAuthorised)) {
            pageSelected = (!Boolean(registryId)) ?
                registryPresentationPage :
                entityRegistrationPage;
        }
    }
    return pageSelected;
}

export default withStyles(styles)(App);

