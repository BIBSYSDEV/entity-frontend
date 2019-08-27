import React, { useState, useEffect, Component  } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './Login';
import EntityRegistrationApp from './EntityRegistrationApp';
import RegistryPresentation from './RegistryPresentation';
import ChangePassword from './ChangePassword';
import Amplify from '@aws-amplify/core';
import config from './config';
import Search from './Search';
import { EMPTY, API_KEY, AUTHORISED, REGISTRIES, USER } from './constants';

export interface AppProps {
    newEntity(registryName: string): void;
    data: any;
    storeApiKey(apiKey: string): void;
    initStore(body: any): any;
} 

Amplify.configure(config);

const App = (props: AppProps): any => {

    const { newEntity, storeApiKey, initStore } = props;

    const [apiKey, setApiKey] = useState(sessionStorage.getItem(API_KEY) || EMPTY);
    useEffect((): void => {
        storeApiKey(apiKey);
    }, [apiKey]);

    const [isAuthorised, setIsAuthorised] = useState(sessionStorage.getItem(AUTHORISED) || EMPTY);

    useEffect((): void => {
        sessionStorage.setItem('authorised', isAuthorised);
    }, [isAuthorised]);

    const [registries, setRegistries] = useState(sessionStorage.getItem(REGISTRIES) || EMPTY);
    useEffect((): void => {
        sessionStorage.setItem('registries', registries);
    }, [registries]);

    const [user, setUser] = useState(sessionStorage.getItem(USER) as string || EMPTY);

    useEffect((): void => {
        sessionStorage.setItem('user', user);
    }, [user]);

    const setAuthorised = (isAuthorised: boolean): void => {
        if (isAuthorised) {
            setIsAuthorised('true');
        } else {
            setIsAuthorised(EMPTY);
            setUser(EMPTY);
        }
    }
    
    return <Router>
        <div>
            <Switch>
                <Route exact path="/login" render={(routeProps: any) => (<Login 
                    setAuthorised={setAuthorised} 
                    setUser={setUser}
                    user={EMPTY}
                    setRegistries={setRegistries}
                />)}/>
                <Route exact path="/" render={(routeProps: any) => 
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
                <Route path="/ChangePassword" render={(routeProps: any) =>
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
                <Route exact path="/:registryName/Search" render={(routeProps: any) => 
                    isAuthorised ? (
                        <Search
                            user={user}
                            setAuthorised={setAuthorised}
                            registryName={routeProps.match.params.registryName}
                            entityId={EMPTY}
                        />
                    ) : (
                        <Redirect to={{pathname: "/Login", state: {from: routeProps.location}}} />
                    )
                }/>
                <Route path="/:registryName/Search/:entityId" render={(routeProps: any) => 
                    isAuthorised ? (
                        <Search
                            user={user}
                            setAuthorised={setAuthorised}
                            registryName={routeProps.match.params.registryName}
                            entityId={routeProps.match.params.entityId}
                        />
                    ) : (
                        <Redirect to={{pathname: "/Login", state: {from: routeProps.location}}} />
                    )
                }/>
                <Route exact path="/:registryName" render={(routeProps: any) => 
                    isAuthorised ? (
                        <EntityRegistrationApp 
                            registryId={routeProps.match.params.registryName}
                            user={user}
                            setAuthorised={setAuthorised} 
                            newEntity={newEntity}
                            apiKey={apiKey}
                            entityId={EMPTY}
                            initStore={initStore}
                            history={routeProps.history}
                        />
                    ) : (
                        <Redirect to={{pathname: "/Login", state: {from: routeProps.location}}} />
                    )
                }/>
                <Route path="/:registryName/:entityId" render={(routeProps: any) => 
                    isAuthorised ? (
                        <EntityRegistrationApp 
                            registryId={routeProps.match.params.registryName}
                            user={user}
                            setAuthorised={setAuthorised} 
                            newEntity={newEntity}
                            apiKey={apiKey}
                            entityId={routeProps.match.params.entityId}
                            initStore={initStore}
                            history={routeProps.history}
                        />
                    ) : (
                        <Redirect to={{pathname: "/Login", state: {from: routeProps.location}}} />
                    )
                }/>
            </Switch>
        </div>
    </Router>
    
}

export default App;

