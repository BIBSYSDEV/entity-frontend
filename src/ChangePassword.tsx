import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Header from './Header';
import { EMPTY } from './constants';

export interface ChangePasswordProps {
    user: string;
    setAuthorised(authorised: boolean): void;
}

const ChangePassword = (props: ChangePasswordProps): any => {

    const [oldPassword, setOldPassword] = useState(EMPTY);
    const [newPassword, setNewPassword] = useState(EMPTY);
    const [repeatPassword, setRepeatPassword] = useState(EMPTY);
    const [errorMessage, setErrorMessage] = useState(EMPTY);

    const { user, setAuthorised } = props;

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

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>, history: any): Promise<any> => {
        event.preventDefault();

        try {
            setErrorMessage(EMPTY)
            
            Auth.signIn(user, oldPassword)
                .then(userObject => {
                    if (userObject.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        Auth.completeNewPassword(
                            userObject,        // the Cognito User Object
                            newPassword,       // the new password
                            // OPTIONAL, the required attributes
                            {}
                        ).then(userData => {
                            // at this time the user is logged in if no MFA required
                            Auth.currentAuthenticatedUser()
                                .then(user => {
                                    return Auth.changePassword(user, oldPassword, newPassword);
                                })
                                .then((data) => {
                                })
                                .catch((err) => {
                                    setErrorMessage(err);
                                });
                        }).catch(e => {
                            console.log(e);
                            setErrorMessage(e)
                        });
                    } else {
                        Auth.currentAuthenticatedUser()
                            .then(user => {
                                history.goBack();
                                return Auth.changePassword(user, oldPassword, newPassword);
                            })
                            .then((data) => {
                            })
                            .catch((err) => {
                                setErrorMessage(err);
                            });
                    }
                }).catch(e => {
                    console.log(e);
                });

            history.goBack();
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    const spinner = true;

    const SubmitButton = withRouter(
        ({history}: any) => (
            Boolean(user) ?
                <Button 
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    disabled={!validateForm()}
                    onClick={(event: any): Promise<any> => handleSubmit(event, history)}>Change Password</Button>
                : <div />
        ));
    
    const CancelButton = withRouter(
        ({history}: any) => (
            Boolean(user) ?
                <Button 
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={(): void => history.goBack()}>Cancel</Button>
                : <div />
        )); 

    
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
                    <Typography variant='h5'>
                        Change password 
                    </Typography>
                </div>
                <div>
                    <Typography variant='subtitle2'>
                        (Password must have a minimum of 12 characters, upper and lower case and at least 1 number)
                    </Typography>
                    <form noValidate>
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
                        <SubmitButton/>
                        <CancelButton />
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

export default ChangePassword;