import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Typography from "@material-ui/core/Typography";
import EntityToolBar from './EntityToolBar';
import AppStatus from './AppStatus';

export interface FormProps {
    registryId: string;
    handleNew(): void;
    handlePersist(): void;
    status: string;
}

const EntityRegistrationForm = (props: FormProps): any => {

    const { registryId, handleNew, handlePersist, status } = props;

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
                <AppStatus status={status} />
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
