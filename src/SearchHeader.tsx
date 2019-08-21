import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { EMPTY } from './constants';
import RegistryButton from './RegistryButton';

export interface SearchHeaderProps {
    search(searchValue: string): object[];
    registryName: string;
}

const SearchHeader = (props: SearchHeaderProps): any => {
    
    const { search, registryName } = props;
    
    const [searchValue, setSearchValue] = useState(EMPTY);
    
    const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value);
    }
    
    const searchThis = () => {
        console.log(searchValue);
        search(searchValue);
    };
    
    const EditButton = withRouter(
        ({history}: any) =>
            <Button onClick={() => history.push("/" + registryName)}>Edit</Button>
        );
    
    return (<div>
        <AppBar position="static" color="default">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" align="left">
                Search ({registryName})
                </Typography>
                <EditButton />
                <RegistryButton />
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
                <Button 
                    onClick={searchThis} 
                    color="inherit"
                >Search</Button>
            </Toolbar>
        </AppBar>
    </div>);
}

export default SearchHeader; 