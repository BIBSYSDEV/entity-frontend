import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';

interface ButtonWithRouterProps extends RouteComponentProps {
	path: string;
	label: string;
}

const ButtonWithRouter: React.FC<ButtonWithRouterProps> = ({ history, label, path }) => (
	<Button onClick={() => history.push(`${path}`)}>{label}</Button>
);

export default withRouter(ButtonWithRouter);
