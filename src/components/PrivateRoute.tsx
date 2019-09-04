import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
	component: React.ComponentType<any>;
	isAuthorised: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	component: Component,
	isAuthorised,
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			isAuthorised ? (
				<Component {...props} {...rest} />
			) : (
				<Redirect to={{ pathname: '/Login', state: { from: props.location } }} />
			)
		}
	/>
);

export default PrivateRoute;
