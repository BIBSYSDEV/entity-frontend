import React from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Button from "@material-ui/core/Button";
import API from '@aws-amplify/api';

const styles = createStyles({
    container: {
        padding: '1em'
    },
});

export interface DataProps extends WithStyles<typeof styles> {
    setRegistryId(registryId: string): void;
    registries: string;
}


const RegistryList = (props: DataProps) => {

    const { setRegistryId, registries } = props;

    const fetchRegistries = async () => {
        return await API.get('entity', '/registry', {});
    }

    // let fetchedRegistries = await fetchRegistries();
    let fetchedRegistries = ["TEKORD", "HUMORD"];

    const setRegistryIdentifier: any = (id: string) => {
        if(Boolean(id)){
            setRegistryId(id);
        }
    };

    const listItems: any = fetchedRegistries.map((registry: string) =>
        <li key={registry}>
            <Button onClick = {() => setRegistryIdentifier(registry)}>{registry}</Button>
        </li> 
    )

    return (
        <ul>{listItems}</ul>
    );
}

export default withStyles(styles)(RegistryList);
