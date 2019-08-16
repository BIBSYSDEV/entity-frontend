import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { EMPTY } from './constants';

const styles = createStyles({
    toolBar: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
});

export interface SearchHeaderProps extends WithStyles<typeof styles> {
    search(searchValue: string): object[];
}

const SearchHeader = (props: SearchHeaderProps): any => {
    
    const { classes, search } = props;
    
    const [searchValue, setSearchValue] = useState(EMPTY);
    
    const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value);
    }
    
    const searchThis = () => {
        console.log(searchValue);
        search(searchValue);
    };
    
    return (<div className={classes.toolBar}>
        <AppBar position="static" color="default">
            <Toolbar variant="dense">
                <Typography className={classes.grow} variant="h6" color="inherit" align="left">
                Search
                </Typography>
                <TextField
                    variant='outlined'
                    margin='normal'
                    name='search'
                    label='Search'
                    type='search'
                    id='search'
                    autoFocus
                    onChange={handleSearchValueChange}
                />
                <Button onClick={searchThis} color="inherit">Search</Button>
            </Toolbar>
        </AppBar>
    </div>);
}

export default withStyles(styles)(SearchHeader); 