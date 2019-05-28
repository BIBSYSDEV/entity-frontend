import React, { useState } from 'react';
// import './Login.css';
// import { Auth } from 'aws-amplify';
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
    }
});

export interface LoginProps extends WithStyles<typeof styles> {
    setAuthorised: any;
    setUser: any;
    user: string;
}

const Login = (props: LoginProps) => {

    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    const { classes, setAuthorised, setUser, user } = props;

    let userInput = '';

    const validateForm = () => {
        return userInput.length > 0 && password.length > 0;
    }

    const handleUserChange = (event: any) => {
        setUser(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);

    // try {
        // await Auth.signIn(userInput, password);
        // console.log('Logged in');
        setAuthorised(true);
    // } catch (e) {
    //     alert(e.message);
    // }
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
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
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
                            disabled={validateForm()}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
            </div>

    );
}

export default withStyles(styles)(Login);