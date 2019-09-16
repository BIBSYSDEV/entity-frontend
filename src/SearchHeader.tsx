import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
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
  };

  const searchThis = () => {
    search(searchValue);
  };

  const SearchButton = withRouter(({ history }: any) => (
    <Button
      onClick={() => {
        searchThis();
        history.push('/'.concat(registryName, '/Search'));
      }}
      color="inherit">
      Search
    </Button>
  ));

  const EditButton = withRouter(({ history }: any) => (
    <Button onClick={() => history.push('/'.concat(registryName))}>Edit</Button>
  ));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(searchValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" align="left">
            Search ({registryName})
          </Typography>
          <EditButton />
          <RegistryButton />
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              name="search"
              label="Search"
              type="search"
              id="search"
              autoFocus
              onChange={handleSearchValueChange}
            />
          </form>
          <SearchButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SearchHeader;
