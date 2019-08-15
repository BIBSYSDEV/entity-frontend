import { API, Auth } from 'aws-amplify';
import SecretsManager from 'aws-sdk/clients/secretsmanager';
import { EMPTY } from './constants';
import { Actions } from '@jsonforms/core';
import schema from './schema.json';
import uuidv4 from 'uuid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
    const data = await API.get('entity', "/registry/" + registryName + "/entity/" + entityId, {headers: {'api-key': apiKey}});
    
    return data;
}

export const writeEntity = async (registryName: string, entityId: string, apiKey: string, entity: any)  => {
    
    entity.modified = new Date().toDateString();
    const bodyObject: any = {
            body: entity
    }
    
    console.log(entityId);
    
    if(Boolean(entityId)){
        const id = entityId.split('/').pop();
        bodyObject.id = id;
        return await API.put('entity', "/registry/" + registryName + "/entity/" + id, {
                headers: {'api-key': apiKey}, 
                body:  bodyObject 
            });
    } else {
            bodyObject.id = uuidv4();
        return await API.post('entity', "/registry/" + registryName + "/entity/", {
                headers: {'api-key': apiKey}, 
                body:  bodyObject 
            });
    }
}

export const readSchema = async (registryName: string, apiKey: string) => {
//      const entitySchema = await API.get('entity', "/registry/" + registryName + "/schema", {headers: {'api-key': apiKey}});
//      transform entitySchema to jsonSchema
//      return entitySchema
    return schema;
}

export const createRegistryUri = (registryName: string) => {
    return "http://unit.no/entitydata#" + registryName.toLowerCase();
}

