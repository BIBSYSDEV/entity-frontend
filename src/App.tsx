import { connect } from 'react-redux';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import {getData, JsonFormsState} from '@jsonforms/core';
import './App.css';
import SimpleAppBar from "./SimpleAppBar";
import EntityRegistrationForm from './EntityRegistrationForm';
import EntityDataPresentation from './EntityDataPresentation';

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
    dataAsString: string;
    registry: string;
}

const App = (props: AppProps) => {
    
    const { classes, dataAsString, registry } = props;
    
    const handleNew = () => { 
        console.log('Nytt emneord'); 
    }

    const handlePersist = () => {
        const { dataAsString, registry } = props;
        console.log('registry: ' + registry);
        console.log(dataAsString);
    }
    
    return (
        <div>
            <SimpleAppBar />
            <Grid container justify={'center'} spacing={16} className={classes.container}>
                <Grid item sm={9}>
                    <EntityRegistrationForm
                        registry={registry}
                        handleNew={handleNew}
                        handlePersist={handlePersist}
                    />
                </Grid>
                <Grid item sm={9}>
                    <EntityDataPresentation
                        dataAsString={dataAsString}
                    />                                    
                </Grid>
            </Grid>
        </div>
    );
}

const mapStateToProps = (state: JsonFormsState) => {
    return { dataAsString: JSON.stringify(getData(state), null, 2) }
};

export default connect(mapStateToProps)(withStyles(styles)(App));

