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
    setRegistryId: any;
}

const RegistryList = (props: DataProps) => {

    const { setRegistryId } = props;

    const readRegistries: Array<string> =  ['HumOrd', 'TekOrd'];

    const setRegistryIdentifier: any = (id: string, event: MouseEvent) => {
        console.log('id:');
        console.log(id);
        if(Boolean(id)){
            setRegistryId(id);
        }
    };

    const listItems: any = readRegistries.map((registry: string) =>
        <li key={registry}>
            <Button onClick = {(e: any) => setRegistryIdentifier(registry, e)}>{registry}</Button>
        </li> 
    )

    return (
        <ul>{listItems}</ul>
    );
}

export default withStyles(styles)(RegistryList);
