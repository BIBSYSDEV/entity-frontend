import React, { useState } from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Header from './Header';
import { Grid } from '@material-ui/core';
import EntityRegistrationForm from './EntityRegistrationForm';
import EntityDataPresentation from './EntityDataPresentation';
import { JsonFormsState, getData } from '@jsonforms/core';
import { connect } from 'react-redux';

const styles = createStyles({
    container: {
        padding: '1em'
    },
});

export interface DataProps extends WithStyles<typeof styles> {
    registryId: string;    
    dataAsString: string;
    setAuthorised: any;
    resetRegistry: any;
}

const EntityRegistrationApp = (props: DataProps) => {

    const { classes, dataAsString, registryId, setAuthorised, resetRegistry } = props;
    
    const handleNew = () => { 
        console.log('Nytt emneord'); 
    }

    const [ spin, setSpin] = useState(false);

    const handlePersist = () => {
        const { dataAsString, registryId } = props;
        setSpin(true);
        console.log('registry: ' + registryId);
        console.log(dataAsString);
        setTimeout(() => {
            setSpin(false);
        }, 5000);
    }
    
    return (
        <div>
            <Header spin={spin} />
            <Grid container justify={'center'} spacing={8} className={classes.container}>
                <Grid item sm={9}>
                    <EntityRegistrationForm
                        registryId={registryId}
                        handleNew={handleNew}
                        handlePersist={handlePersist}
                        setAuthorised={setAuthorised}
                        resetRegistry={resetRegistry}
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

export default  connect(mapStateToProps)(withStyles(styles)(EntityRegistrationApp));
