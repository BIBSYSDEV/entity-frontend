import React from 'react';
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = createStyles({
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
});

export interface DataProps extends WithStyles<typeof styles> {
    dataAsString: string;    
}

const EntityDataPresentation = (props:DataProps) => {

    const { classes, dataAsString } = props;

    return (
        <React.Fragment>
            <Typography
                variant={'display1'}
                className={classes.title}
            >
            Data
            </Typography>
            <div className={classes.dataContent}>
                <pre>{dataAsString}</pre>
            </div>
        </React.Fragment>

    )

}

 export default withStyles(styles)(EntityDataPresentation);
