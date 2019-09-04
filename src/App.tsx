import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';
import EntityRegistrationApp from './EntityRegistrationApp';
import RegistryPresentation from './RegistryPresentation';
import ChangePassword from './ChangePassword';
import Amplify from '@aws-amplify/core';
import config from './config';
import Search from './Search';
import { EMPTY, API_KEY, AUTHORISED, REGISTRIES, USER } from './constants';
import PrivateRoute from './components/PrivateRoute';
import Header from './Header';

export interface AppProps {
	newEntity(registryName: string): void;
	data: any;
	initStore(body: any): any;
}

Amplify.configure(config);

const App = (props: AppProps): any => {
	const { newEntity, initStore } = props;

	const [apiKey, setApiKey] = useState(sessionStorage.getItem(API_KEY) || EMPTY);
	useEffect((): void => {
		sessionStorage.setItem('apiKey', apiKey);
	}, [apiKey]);

	const [isAuthorised, setIsAuthorised] = useState(sessionStorage.getItem(AUTHORISED) || EMPTY);
	useEffect((): void => {
		sessionStorage.setItem('authorised', isAuthorised);
	}, [isAuthorised]);

	const [registries, setRegistries] = useState(sessionStorage.getItem(REGISTRIES) || EMPTY);
	useEffect((): void => {
		sessionStorage.setItem('registries', registries);
	}, [registries]);

	const [user, setUser] = useState((sessionStorage.getItem(USER) as string) || EMPTY);

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
	};

	return (
		<Router>
			<Header user={user} setAuthorised={setAuthorised} />
			<Switch>
				<Route
					exact
					path="/login"
					render={() => (
						<Login
							setAuthorised={setAuthorised}
							setUser={setUser}
							setRegistries={setRegistries}
						/>
					)}
				/>

				<PrivateRoute
					path="/ChangePassword"
					isAuthorised={!!isAuthorised}
					component={() => <ChangePassword user={user} />}
				/>

				<PrivateRoute
					exact
					path="/"
					isAuthorised={!!isAuthorised}
					component={() => (
						<RegistryPresentation registries={registries} setApiKey={setApiKey} />
					)}
				/>

				<PrivateRoute
					exact
					path="/:registryName/Search"
					isAuthorised={!!isAuthorised}
					component={(props: any) => (
						<Search user={user} setAuthorised={setAuthorised} {...props} />
					)}
				/>

				<PrivateRoute
					path="/:registryName/Search/:entityId"
					isAuthorised={!!isAuthorised}
					component={(props: any) => (
						<Search user={user} setAuthorised={setAuthorised} {...props} />
					)}
				/>

				<PrivateRoute
					exact
					path="/:registryName"
					isAuthorised={!!isAuthorised}
					component={(props: any) => (
						<EntityRegistrationApp
							user={user}
							setAuthorised={setAuthorised}
							newEntity={newEntity}
							apiKey={apiKey}
							initStore={initStore}
							{...props}
						/>
					)}
				/>

				<PrivateRoute
					path="/:registryName/:entityId"
					isAuthorised={!!isAuthorised}
					component={(props: any) => (
						<EntityRegistrationApp
							user={user}
							setAuthorised={setAuthorised}
							newEntity={newEntity}
							apiKey={apiKey}
							initStore={initStore}
							{...props}
						/>
					)}
				/>
			</Switch>
		</Router>
	);
};

export default App;
