import { API, Auth } from 'aws-amplify';
import SecretsManager from 'aws-sdk/clients/secretsmanager';
import { EMPTY } from './constants';
import { Actions } from '@jsonforms/core';
import schema from './schema.json';
import uischema from './uischema.json';

export const fetchCognitoUserGroups = (userObject: any): string[] => {
    return userObject.signInUserSession.accessToken.payload['cognito:groups'];
};

export const fetchRegistries = async () => {
    let registries: string[] = [];
    await API.get('entity', '/registry', {}).then((data): void => {
        registries = (data as string[]);
    });
    return registries;
};

export const findRegistryIdentifierInPath = (): string => {
    return window
        .location
        .pathname
        .substring(1)
        .split("/")[0];
};

export const findEntityIdentifierInPath = (): string => {
    const pathElements: string[] = window
        .location
        .pathname
        .substring(1)
        .split("/");
    return pathElements.length > 1 ? 
        pathElements[1] :
        EMPTY;
};

export const fetchApiKey = (registryName: string, setApiKey: (apiKey: string) => void): void => {
    Auth.currentCredentials().then((credentials): any => {
        const options: object = {
            apiVersion: '2017-10-17',
            credentials: Auth.essentialCredentials(credentials),
        };
        const secretsManager = new SecretsManager(options)
        secretsManager.getSecretValue({
            SecretId: 'entity_frontend',
            VersionStage: 'AWSCURRENT'
        }, (err, data): void => {
            setApiKey(JSON.parse(data.SecretString as string)[registryName]);
        });
    });

};

export const initialiseStore = (dispatch: any, data: any, schema: any, uischema: any) => {
    dispatch(Actions.init(data, schema, uischema));
};

export const readEntity = async (registryName: string, entityId: string, apiKey: string) => {
    return await API.get('entity', "/registry" + registryName + "/entity/" + entityId, {headers: {'api-key': apiKey}});
}

export const writeEntity = async (registryName: string, entityId: string, apiKey: string, entity: string)  => {
    if(Boolean(entityId)){
        return await API.put('entity', "/registry" + registryName + "/entity/" + entityId, {
                headers: {'api-key': apiKey}, 
                body: entity
            });
    }else {
        return await API.post('entity', "/registry" + registryName + "/entity/", {
                headers: {'api-key': apiKey}, 
                body: entity
            });
    }
}

export const readSchema = async (registryName: string, apiKey: string) => {
    const entitySchema = await API.get('entity', "/registry/" + registryName + "/schema", {headers: {'api-key': apiKey}});
    // transform entitySchema to jsonSchema
    return schema;
}

export const createRegistryUri = (registryName: string) => {
    return "http://unit.no/entitydata#" + registryName.toLowerCase();
}

