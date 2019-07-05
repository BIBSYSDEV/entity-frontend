import React, { useState, Fragment } from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { ResultType } from './SearchResults';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';

const styles = createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    container: {
        padding: '1em'
    },
    card: {
        minWidth: 275,
        maxWidth: 800,
    },
});

const resultPresentationConfig: any = {
  title: ['preferredLabel', 'alternativeLabel', 'id'],
  visibleAttributes:  {
                          'preferredLabel': 'textArray',
                          'definition': 'text',
                          'alternativeLabel': 'textArray',
                          'broader': 'link',
                          'narrower': 'link',
                          'seeAlso': 'link',
                          'related': 'link',
                      },
};

export interface ResultProps extends WithStyles<typeof styles> {
    result: ResultType;
}

const ResultPresentation = (props: ResultProps): any => {
    const { classes, result } = props;

    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
    
    const renderLink = (key: string, value: any): any => {
        return  <Typography>
                    <Typography>
                        <InputLabel shrink>{key}</InputLabel> <Typography><Link href={value}>{value}</Link></Typography>
                    </Typography>
                </Typography>;
    };

    const renderSingleLine = (key: string, value: any): any => {
        return (<Typography>
                <InputLabel shrink>{key}</InputLabel> 
                    <Typography>{(Boolean(value.value) ? value.value + " (" + value.lang + ")" : value)}</Typography>
                </Typography>);
    }
    
    const renderText = (key: string, value: any): any => {
        
        if(Array.isArray(value)){
            let index = 0;
            return value.map((element: any) => {
                if(index > 0) {
                    key = '';
                }
                index++;
                return (renderSingleLine(key, element)); 
            });
        } else {
            return renderSingleLine(key, value);
        }
    };
    
    const renderAttribute = (key: string, attribute: any): string => {
        if(Boolean(resultPresentationConfig.visibleAttributes[key])){
            if(resultPresentationConfig.visibleAttributes[key] === 'link'){
                return renderLink(key, attribute);
            } else {
                return renderText(key, attribute);
            }
        } else{
            return '';
        }
    };
    
    const attributes = Object.keys(result).map((key: string) => {
        const attribute = (result as any)[key];
            return (renderAttribute(key, attribute)); 
    });

    return (<Box>
            <ListItem  button onClick={handleClick} key={result.id}>
                <ListItemText primary={(result as any)['preferredLabel'][0]['value']} secondary={result.id} />
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <Card className={classes.card}>
                    <CardContent>
                        {attributes}
                    </CardContent>
                </Card>
            </Collapse>
            </Box>);
    
//    return ();
}

export default withStyles(styles)(ResultPresentation);