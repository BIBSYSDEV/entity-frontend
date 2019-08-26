import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const RegistryButton = withRouter(
    ({history}: any) => (
        <Button onClick={() => history.push("/")}>Registry</Button>
    )); 
    
export default RegistryButton;