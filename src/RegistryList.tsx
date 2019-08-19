import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Button from "@material-ui/core/Button";
import { fetchApiKey } from './utils';

const styles = createStyles({
    container: {
        padding: '1em'
    },
});

export interface DataProps extends WithStyles<typeof styles> {
    registries: string;
    setApiKey(apiKey: string): void;
}


const RegistryList = (props: DataProps): any => {

    const { registries, setApiKey } = props;

    const renderListItems = (): object => {
        return JSON.parse(registries).map((registry: string): object =>
            <li key={registry}>
                <Button onClick={() => fetchApiKey(registry, setApiKey)}><NavLink to={registry} style={{textDecoration: 'none'}}>{registry}</NavLink></Button>
            </li>); 
    };

    const listItems = useRef(renderListItems());

    return (
        <ul>{listItems.current}</ul>
    );
}

export default withStyles(styles)(RegistryList);
