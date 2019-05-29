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
    setAuthorised: any;
    setUser: any;
    user: string;
}

const Login = (props: LoginProps) => {

    const [password, setPassword] = useState('');
    const [userInput, setUserInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { classes, setAuthorised, setUser, user } = props;

    const validateForm = () => {
        return Boolean(userInput) && Boolean(password);
    }

    const handleUserChange = (event: any) => {
        setUserInput(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            setErrorMessage('')
            await Auth.signIn(userInput, password);
            console.log('Logged in as');
            console.log(userInput);
            setAuthorised(true);
            setUser(userInput);
        } catch (e) {
            console.log(e);
            setErrorMessage(e.message);
        }
    }

    const spin = true;

    return (
        <div>
            <Header spin={spin} user={user}/>
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