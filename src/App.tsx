import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import './App.css';
import Login from './Login';
import EntityRegistrationApp from './EntityRegistrationApp';
import RegistryPresentation from './RegistryPresentation';
import ChangePassword from './ChangePassword';
import Amplify from '@aws-amplify/core';
import config from './config';
import Search from './Search';
import { EMPTY, REGISTRY_ID, API_KEY, AUTHORISED, REGISTRIES, USER } from './constants';

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
    initStore(body: any): any;
} 

Amplify.configure(config);

const App = (props: AppProps): any => {

    const { newEntity, setRegistryName, storeApiKey, initStore } = props;
//    const [registryId, setRegistryId] = useState(sessionStorage.getItem(REGISTRY_ID) || EMPTY);
//    useEffect((): void => {
//        setRegistryName(registryId);
//    }, [registryId])

    const [apiKey, setApiKey] = useState(sessionStorage.getItem(API_KEY) || EMPTY);
    useEffect((): void => {
        storeApiKey(apiKey);
    }, [apiKey])

    const [isAuthorised, setIsAuthorised] = useState(sessionStorage.getItem(AUTHORISED) || EMPTY);

    useEffect((): void => {
        sessionStorage.setItem('authorised', isAuthorised);
    }, [isAuthorised])

    const [registries, setRegistries] = useState(sessionStorage.getItem(REGISTRIES) || EMPTY);
    useEffect((): void => {
        sessionStorage.setItem('registries', registries);
    }, [registries])

    const [user, setUser] = useState(sessionStorage.getItem(USER) as string || EMPTY);

    useEffect((): void => {
        sessionStorage.setItem('user', user);
    }, [user])

    const setAuthorised = (isAuthorised: boolean) => {
        if (isAuthorised) {
            setIsAuthorised('true');
        } else {
            setIsAuthorised('false');
            setUser(EMPTY);
        }
    }
    
    return <Router>
        <div>
            <Switch>
                <Route path="/login" render={(routeProps: any) => (<Login 
                    setAuthorised={setAuthorised} 
                    setUser={setUser}
                    user={EMPTY}
                    setRegistries={setRegistries}
                    location={routeProps.location}
                />)}/>
                <Route path="/ChangePassword" render={(routeProps:any) =>
                    isAuthorised ? (
                            <ChangePassword
                                user={user}
                                setAuthorised={setAuthorised}
                                history={routeProps.history}
                            />
                        ) : (
                            <Redirect to={{pathname: "/Login", state: {from: routeProps.location}}} />
                        )
                    }/>
                <Route exact path="/" render={(routeProps:any) => 
                        isAuthorised ? (
                            <RegistryPresentation 
                                user={user}
                                registries={registries}
                                setAuthorised={setAuthorised}
                                setApiKey={setApiKey}
                            />
                        ) : (
                            <Redirect to={{pathname: "/Login", state: {from: routeProps.location}}} />
                        )
                    }/>
                <Route path="/:registryName/Search" render={(routeProps:any) => 
                        isAuthorised ? (
                            <Search
                                user={user}
                                setAuthorised={setAuthorised}
                                registryName={routeProps.match.params.registryName}
                            />
                        ) : (
                            <Redirect to={{pathname: "/Login", state: {from: routeProps.location}}} />
                        )
                    }/>
                <Route path="/:registryName/:entityId" render={(routeProps:any) => 
                        isAuthorised ? (
                            <EntityRegistrationApp 
                                registryId={routeProps.match.params.registryName}
                                user={user}
                                setAuthorised={setAuthorised} 
                                newEntity={newEntity}
                                apiKey={apiKey}
                                entityId={routeProps.match.params.entityId}
                                initStore={initStore}
                            />
                        ) : (
                            <Redirect to={{pathname: "/Login", state: {from: routeProps.location}}} />
                        )
                    }/>
                <Route path="/:registryName" render={(routeProps:any) => 
                        isAuthorised ? (
                            <EntityRegistrationApp 
                                registryId={routeProps.match.params.registryName}
                                user={user}
                                setAuthorised={setAuthorised} 
                                newEntity={newEntity}
                                apiKey={apiKey}
                                entityId={EMPTY}
                                initStore={initStore}
                            />
                        ) : (
                            <Redirect to={{pathname: "/Login", state: {from: routeProps.location}}} />
                        )
                    }/>
            </Switch>
        </div>
    </Router>
    
}

export default withStyles(styles)(App);

