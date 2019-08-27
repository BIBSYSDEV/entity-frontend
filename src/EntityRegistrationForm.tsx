import React from 'react';
import { JsonForms } from '@jsonforms/react';
import Typography from "@material-ui/core/Typography";
import EntityToolBar from './EntityToolBar';

const EntityRegistrationForm = ({ registryId, handleNew, handlePersist }): any => {

    return (
        <React.Fragment>
            <Typography
                variant={'h1'}
            >
                <EntityToolBar 
                    registryId={registryId} 
                    handleNew={handleNew}
                    handlePersist={handlePersist}
                />
            </Typography>
            <div>
                <JsonForms/>
            </div>
            <Typography
                variant={'h1'}
            >
                <EntityToolBar 
                    registryId={registryId} 
                    handleNew={handleNew}
                    handlePersist={handlePersist}
                />
            </Typography>
        </React.Fragment>

    )

}

export default EntityRegistrationForm;
