import React, { useState } from 'react';
import { ResultType } from './SearchResults';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { LINK } from './constants';

const resultPresentationConfig: any = {
    title: ['preferredLabel', 'alternativeLabel', 'id'],
    visibleAttributes:  {
        'preferredLabel': {
            type: 'textArray',
            label: 'Preferred label:',
        },
        'definition': { 
            type: 'text',
            label: 'Definition:',
        },
        'alternativeLabel': {
            type: 'textArray',
            label: 'Alternative label:',
        },
        'broader': {
            type: 'link',
            label: 'Broader:',
        },
        'narrower': {
            type: 'link',
            label: 'Narrower:',
        },
        'seeAlso': {
            type: 'link',
            label: 'See also:',
        },
        'related': {
            type: 'link',
            label: 'Related:',
        },
    },
};

export interface ResultProps {
    result: ResultType;
    registryName: string;
    isOpen: boolean;
}

const ResultPresentation = (props: ResultProps): any => {
    const { result, registryName, isOpen } = props;

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    
    const renderLink = (key: string, value: any): any => {
        return <Typography>
            <InputLabel shrink>{key}</InputLabel> 
            {(Array.isArray(value)) ? 
                (value as any[]).map((element: string) => {
                    return (<Typography><Link to={"/".concat(registryName, "/Search/", element)}>{element}</Link></Typography>);
                }) : 
                <Typography><Link to={"/".concat(registryName, "/Search/", value)}>{value}</Link></Typography>
            }
        </Typography>;
    };

    const renderSingleLine = (key: string, value: any): any => {
        return (<Typography>
            <InputLabel shrink>{key}</InputLabel> 
            <Typography>{(Boolean(value.value) ? value.value + " (" + value.lang + ")" : value)}</Typography>
        </Typography>);
    }
    
    const renderText = (key: string, value: any): any => {
        
        if (Array.isArray(value)) {
            let index = 0;
            return value.map((element: any) => {
                if (index > 0) {
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
        if (Boolean(resultPresentationConfig.visibleAttributes[key])) {
            if (resultPresentationConfig.visibleAttributes[key].type === LINK) {
                return renderLink(resultPresentationConfig.visibleAttributes[key].label, attribute);
            } else {
                return renderText(resultPresentationConfig.visibleAttributes[key].label, attribute);
            }
        } else {
            return '';
        }
    };
    
    const attributes = Object.keys(result).map((key: string) => {
        const attribute = (result as any)[key];
        return (renderAttribute(key, attribute)); 
    });

    return (<Box>
        <ListItem  button onClick={handleClick} key={result.id}>
            <ListItemText primary={(result as any)['preferredLabel'][0]['value']} secondary={(result as any).identifier} />
        </ListItem>
        <Collapse in={open||isOpen} timeout='auto' unmountOnExit>
            <Card>
                <CardContent>
                    {attributes}
                    <Link to={"/".concat(registryName).concat("/").concat(result.id)} style={{textDecoration: 'none'}}><Button variant='outlined'>Edit</Button></Link>
                </CardContent>
            </Card>
        </Collapse>
    </Box>);
}

export default ResultPresentation;