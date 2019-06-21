import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

export interface ChangePasswordProps extends WithStyles<typeof styles> {
    user: string;
    setChangePassword(changePassword: boolean): void;
    setAuthorised(authorised: string): void;
    chooseRegistry(): void;
}

const ChangePassword = (props: ChangePasswordProps): any => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { classes, user, setChangePassword, setAuthorised, chooseRegistry } = props;

    const validateNewPassword = (newPassword: string): boolean => {
        return newPassword.length > 12;
    }

    const validateForm = (): boolean => {
        return Boolean(oldPassword) && Boolean(newPassword) && Boolean(repeatPassword) && (newPassword === repeatPassword) && validateNewPassword(newPassword);
    }

    const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setOldPassword(event.target.value);
    }

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewPassword(event.target.value);
    }

    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRepeatPassword(event.target.value);
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>): Promise<any> => {
        event.preventDefault();

        try {
            setErrorMessage('')
            Auth.currentAuthenticatedUser()
                .then(user => {
                    return Auth.changePassword(user, oldPassword, newPassword);
                })
                .then(data => console.log(data))
                .catch(err => console.log(err));
//            await Auth.signIn(user, oldPassword)
//                .then((userObject): void => {
//                    console.log(userObject);
//                    userObject.getCurrentSession();
//                    Auth.completeNewPassword(
//                        userObject,        // the Cognito User Object
//                        newPassword,       // the new password
//                        {}
//                    ).then((): void => {
//                        console.log('change password')
//                    // at this time the user is logged in if no MFA required
//                    }).catch((e): void => {
//                        setErrorMessage(e.message);
//                    });
//                }).catch((e): void => {
//                    setErrorMessage(e.message);
//                });
            setChangePassword(false);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    const handleCancel = (): void => {
        setChangePassword(false);
    }

    const spinner = true;

    return (
        <div>
            <Header 
                spinner={spinner} 
                user={user} 
                setChangePassword={setChangePassword} 
                setAuthorised={setAuthorised}
                chooseRegistry={chooseRegistry}
            />
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography variant='h5'>
                        Change password
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='oldPassword'
                            label='Old password'
                            type='password'
                            name='oldPassword'
                            autoFocus
                            onChange={handleOldPasswordChange}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='newPassword'
                            label='New password'
                            type='password'
                            id='newPassword'
                            onChange={handleNewPasswordChange}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='repeatPassword'
                            label='Repeat new password'
                            type='password'
                            id='repeatPassword'
                            onChange={handleRepeatPasswordChange}
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
                            Change password
                        </Button>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={handleCancel}
                        >
                            Cancel
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

export default withStyles(styles)(ChangePassword);