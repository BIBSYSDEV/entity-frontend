import React from 'react';
import { JsonForms } from '@jsonforms/react';
import Typography from "@material-ui/core/Typography";
import EntityToolBar from './EntityToolBar';

export interface FormProps {
    registryId: string;
    handleNew(): void;
    handlePersist(entityId: string): void;
    entityId: string;
}

const EntityRegistrationForm = (props: FormProps): any => {

    const { registryId, handleNew, handlePersist, entityId } = props;

    return (
        <React.Fragment>
            <Typography
                variant={'h1'}
            >
                <EntityToolBar 
                    registryId={registryId} 
                    handleNew={handleNew}
                    handlePersist={handlePersist}
                    entityId={entityId}
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
