import React from 'react';
import { JsonForms } from '@jsonforms/react';
import Typography from "@material-ui/core/Typography";
import EntityToolBar from './EntityToolBar';

const styles = createStyles({
    title: {
        textAlign: 'center',
        padding: '0.25em'
    },
    registrationform: {
        margin: 'auto'
    },
});

export interface FormProps {
    registryId: string;
    handleNew(): void;
    handlePersist(): void;
}

const EntityRegistrationForm = (props: FormProps): any => {

    const { registryId, handleNew, handlePersist } = props;

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
