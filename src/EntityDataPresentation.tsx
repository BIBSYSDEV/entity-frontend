import React from 'react';
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = createStyles({
    root: {
        width: '100%'
    },
    title: {
        width: '100%',
        textAlign: 'center',
        padding: '0.25em',
    },
    dataContent: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0.25em',
        backgroundColor: '#cecece',
        marginLeft: '10%',
        width: '80%',
    },
});

export interface DataProps extends WithStyles<typeof styles> {
    dataAsString: string;    
}

const EntityDataPresentation = (props: DataProps) => {

    const { classes, dataAsString } = props;

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'display1'} className={classes.title}>Data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={classes.dataContent}>
                    <pre>{dataAsString}</pre>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )

}

export default withStyles(styles)(EntityDataPresentation);
