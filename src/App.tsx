import React, { useState } from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import './App.css';
import Login from './Login';
import EntityRegistrationApp from './EntityRegistrationApp';
import RegistryPresentation from './RegistryPresentation';

const styles = createStyles({
    toolBar: {
        flexGrow: 1,
    },
    container: {
        padding: '1em'
    },
    title: {
        textAlign: 'center',
        padding: '0.25em'
    },
    dataContent: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0.25em',
        backgroundColor: '#cecece',
    },
    demoform: {
        margin: 'auto'
    },
    grow: {
        flexGrow: 1,
    },
    toolBarTitle: {
        padding: '0 30px',
        margin: '1em',
    }

});

export interface AppProps extends WithStyles<typeof styles> {
    registryId: string;
}

const App = (props: AppProps) => {
    
    const [isAuthorised, setAuthorised] = useState(false);
    const [user, setUser] = useState('');
    const [registryId, setRegistryId] = useState('');

    const resetRegistry = () => {
        setRegistryId('');
        console.log('Resetting registry id');
    }

    let appRender = <Login 
                        setAuthorised={setAuthorised} 
                        setUser={setUser}
                        user={''} 
                    />;

    if(isAuthorised) {
        (!Boolean(registryId)) ?
            appRender = <RegistryPresentation 
                            setRegistryId={setRegistryId}
                            user={user} 
                        />:
            appRender = <EntityRegistrationApp 
                            registryId={registryId} 
                            setAuthorised={setAuthorised} 
                            resetRegistry={resetRegistry} 
                            user={user} 
                        />;
    }



    return appRender;
}

export default withStyles(styles)(App);

