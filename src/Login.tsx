import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Auth } from 'aws-amplify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Container } from '@material-ui/core';
import Header from './Header';
import { fetchRegistries } from './utils';
import { EMPTY } from './constants';

const styles = createStyles({
    body: {
        backgroundColor: 'white',
    },
    paper: {
        marginTop: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: '0.1em',
        backgroundColor: 'red',
    },
    form: {
        width: '100%', 
        marginTop: '0.1em',
    },
    submit: {
        margin: '0.1em',
    },
    error: {
        color: 'red',
    }
});

export interface LoginProps extends WithStyles<typeof styles> {
    user: string;
    setAuthorised(input: boolean): void;
    setUser(input: string): void;
    setRegistries(input: string): void;
}

const Login = (props: LoginProps): any => {

    const [password, setPassword] = useState(EMPTY);
    const [userInput, setUserInput] = useState(EMPTY);
    const [errorMessage, setErrorMessageDisplay] = useState(EMPTY);
    const [spinner, setSpinning] = useState(false);
    
    const { classes, setAuthorised, setUser, user, setRegistries } = props;
    
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
        console.log(history)
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
                className={classes.submit}
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
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
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
                    <Typography className={classes.error}>
                        {errorMessage}
                    </Typography>
                </div> 
            </Container>
        </div>

    );
}

export default withStyles(styles)(Login);