import React from 'react';
import { JsonForms } from '@jsonforms/react';
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import EntityToolBar from './EntityToolBar';

const styles = createStyles({
    title: {
        textAlign: 'center',
        padding: '0.25em'
    },
    registrationform: {
        margin: 'auto'
    },
});

export interface FormProps extends WithStyles<typeof styles> {
    registryId: string;
    handleNew(): void;
    handlePersist(): void;
    setAuthorised(authorised: string): void;
    chooseRegistry(): void;
}

const EntityRegistrationForm = (props: FormProps) => {

    const { classes, registryId, handleNew, handlePersist, setAuthorised, chooseRegistry } = props;

    return (
        <React.Fragment>
            <Typography
                variant={'h1'}
                className={classes.title}
            >
                <EntityToolBar 
                    registryId={registryId} 
                    handleNew={handleNew}
                    handlePersist={handlePersist}
                    setAuthorised={setAuthorised} 
                    chooseRegistry={chooseRegistry} 
                />
            </Typography>
            <div className={classes.registrationform}>
                <JsonForms/>
            </div>
            <Typography
                variant={'h1'}
                className={classes.title}
            >
                <EntityToolBar 
                    registryId={registryId} 
                    handleNew={handleNew}
                    handlePersist={handlePersist}
                    setAuthorised={setAuthorised} 
                    chooseRegistry={chooseRegistry} 
                />
            </Typography>
        </React.Fragment>

    )

}

export default withStyles(styles)(EntityRegistrationForm);
