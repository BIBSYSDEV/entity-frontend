import React from 'react';
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const EntityDataPresentation = ({ dataAsString }): any => {

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h4'}>Data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <pre>{dataAsString}</pre>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )

}

export default EntityDataPresentation;
