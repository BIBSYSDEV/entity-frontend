import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './ikon.png';
import { Button } from '@material-ui/core';
import './Header.css';
import ButtonWithRouter from './components/ButtonWithRouter';

export interface HeaderProps {
	user: string;
	setAuthorised(authorised: boolean): void;
}

const Header: React.FC<HeaderProps> = ({ user, setAuthorised }) => {
	const handleLogout = (): void => {
		setAuthorised(false);
	};

	return (
		<div className="header_root">
			<AppBar position="static" color="default">
				<Toolbar variant="dense">
					<Link to="/">
						<img src={logo} className="header_logoStill" alt="logo" />
					</Link>
					<Typography
						className="header_title"
						variant="h4"
						color="inherit"
						align="center"
					>
						Emneregister demo
					</Typography>
					<Typography variant="h6">
						{user}
						{user && (
							<ButtonWithRouter path="/ChangePassword" label="Change Password" />
						)}
						{user && (
							<Button onClick={handleLogout} color="inherit">
								Logout
							</Button>
						)}
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};
export default Header;
