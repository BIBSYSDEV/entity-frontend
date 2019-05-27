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
    handleNew: any;
    handlePersist: any;
}

const EntityRegistrationForm = (props: FormProps) => {

    const { classes, registryId, handleNew, handlePersist } = props;

    return (
        <React.Fragment>
            <Typography
                variant={'display1'}
                className={classes.title}
            >
                <EntityToolBar 
                    registryId={registryId} 
                    handleNew={handleNew}
                    handlePersist={handlePersist} 
                />
            </Typography>
            <div className={classes.registrationform}>
                <JsonForms/>
            </div>
            <Typography
                variant={'display1'}
                className={classes.title}
            >
                <EntityToolBar 
                    registryId={registryId} 
                    handleNew={handleNew}
                    handlePersist={handlePersist} 
                />
            </Typography>
        </React.Fragment>

    )

}

export default withStyles(styles)(EntityRegistrationForm);
