import React, { useRef } from 'react';
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
    setRegistryId(registryId: string): void;
    registries: string;
    setApiKey(apiKey: string): void;
}


const RegistryList = (props: DataProps) => {

    const { setRegistryId, registries, setApiKey } = props;

    const setRegistryIdentifier: any = (id: string) => {
        if(Boolean(id)){
            setRegistryId(id);
            fetchApiKey(id, setApiKey);
            }
    };

    const renderListItems = () => {
        return JSON.parse(registries).map((registry: string) =>
        <li key={registry}>
            <Button onClick = {() => setRegistryIdentifier(registry)}>{registry}</Button>
        </li>); 
    ;}

    const listItems = useRef(renderListItems());

    return (
        <ul>{listItems.current}</ul>
    );
}

export default withStyles(styles)(RegistryList);
