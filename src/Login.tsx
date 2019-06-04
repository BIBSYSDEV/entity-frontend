import React, { useState } from 'react';
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
    setAuthorised(input: string): void;
    setChangePassword(input: boolean): void;
    setUser(input: string): void;
    setRegistries(input: string): void;
}

const Login = (props: LoginProps) => {

    const [password, setPassword] = useState('');
    const [userInput, setUserInput] = useState('');
    const [errorMessage, setErrorMessageDisplay] = useState('');

    const { classes, setAuthorised, setUser, user, setChangePassword, setRegistries } = props;

    const validateForm = () => {
        return Boolean(userInput) && Boolean(password);
    }

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const fetchCognitoUserGroups = (userObject: any) => {
        return JSON.stringify(userObject.signInUserSession.accessToken.payload['cognito:groups']);
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setErrorMessageDisplay('')
        try {
            await Auth.signIn(userInput, password)
                .then(userObject => {
                    setRegistries(fetchCognitoUserGroups(userObject));
                    if(userObject.challengeName === 'NEW_PASSWORD_REQUIRED'){
                        setChangePassword(true);
                        setPassword(password);
                    }
                });
            setAuthorised('true');
            setUser(userInput);
        } catch (e) {
            setErrorMessageDisplay(e.message);
        }
    }

    const spinner = true;

    return (
        <div>
            <Header spinner={spinner} user={user} setChangePassword={setChangePassword}/>
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
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            disabled={!validateForm()}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
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