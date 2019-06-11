import React from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Button from "@material-ui/core/Button";

const styles = createStyles({
    container: {
        padding: '1em'
    },
});

export interface DataProps extends WithStyles<typeof styles> {
    setRegistryId(registryId: string): void;
}

const RegistryList = (props: DataProps) => {

    const { setRegistryId } = props;

    const readRegistries: string[] =  ['HUMORD', 'TEKORD'];

    const setRegistryIdentifier: any = (id: string) => {
        if(Boolean(id)){
            setRegistryId(id);
        }
    };

    const listItems: any = readRegistries.map((registry: string) =>
        <li key={registry}>
            <Button onClick = {() => setRegistryIdentifier(registry)}>{registry}</Button>
        </li> 
    )

    return (
        <ul>{listItems}</ul>
    );
}

export default withStyles(styles)(RegistryList);
