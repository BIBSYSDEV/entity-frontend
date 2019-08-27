import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Auth } from 'aws-amplify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Header from './Header';
import { fetchRegistries } from './utils';
import { EMPTY } from './constants';

const Login = ({ setAuthorised, setUser, user, setRegistries }): any => {

    const [password, setPassword] = useState(EMPTY);
    const [userInput, setUserInput] = useState(EMPTY);
    const [errorMessage, setErrorMessageDisplay] = useState(EMPTY);
    const [spinner, setSpinning] = useState(false);
    
    const validateForm = (): any => {
        return Boolean(userInput) && Boolean(password);
    }

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserInput(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>, history: any) => {
        event.preventDefault();

        setSpinning(true);
        setErrorMessageDisplay(EMPTY);
        try {
            let registries = await fetchRegistries();
            await Auth.signIn(userInput, password)
                .then((user): void => {
                    setRegistries(JSON.stringify(registries));
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        setPassword(password);
                        history.push("/ChangePassword");
                    }
                });
            setAuthorised(true);
            history.push("/");
            setUser(userInput);
        } catch (e) {
            setErrorMessageDisplay(e.message);
            setSpinning(false);
        }
        setSpinning(false);
    };

    const AuthButton = withRouter(
        ({history}: any) => (<Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={!validateForm()}
            onClick={(event: any) => {
                handleSubmit(event, history);
            }}
        >Sign In</Button>)
    );

    
    return (
        <div>
            <Header 
                spinner={spinner} 
                user={user} 
                setAuthorised={setAuthorised}
            />
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div>
                    <Avatar>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>
                        Sign in
                    </Typography>
                    <form noValidate>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='userInput'
                            label='User name'
                            name='user'
                            autoComplete='user name'
                            autoFocus
                            onChange={handleUserChange}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            onChange={handlePasswordChange}
                        />
                        <AuthButton>
                            Sign In
                        </AuthButton>
                    </form>
                </div>
                <div>
                    <Typography>
                        {errorMessage}
                    </Typography>
                </div> 
            </Container>
        </div>

    );
}

export default Login;