import React from 'react';
import { withRouter } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import RegistryButton from './RegistryButton';

export interface AppProps {
    registryId: string;
    handleNew(): void;
    handlePersist(entityId: string): void;
    entityId: string
}

const EntityToolBar = (props: AppProps): any => {
    
    const { registryId, handleNew, handlePersist, entityId } = props;

    const SearchButton = withRouter(
        ({history}: any) => (
            <Button onClick={() => history.push("/" + registryId + "/Search")}>Search</Button>
        )); 
    
    return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" align="left">
                    Emneord ({registryId})
                    </Typography>
                    <Button onClick={handleNew} color="inherit">New</Button>
                    <Button onClick={handlePersist(entitiyId)} color="inherit">Save</Button>
                    <RegistryButton />
                    <SearchButton />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default EntityToolBar;
