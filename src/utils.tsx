import { API, Auth } from 'aws-amplify';
import SecretsManager from 'aws-sdk/clients/secretsmanager';

export const fetchCognitoUserGroups = (userObject: any): string[] => {
    return userObject.signInUserSession.accessToken.payload['cognito:groups'];
}

export const fetchRegistries = (): string[] => {
    let registries: string[] = [];
    API.get('entity', '/registry', {}).then((data): object => {
        registries = (data as string[]);
    });
    return registries;
}

export const findRegistryIdentifierInPath = (): string => {
    return window
        .location
        .pathname
        .substring(1)
        .split("/")[0];
}

export const findEntityIdentifierInPath = (): string => {
    const pathElements: string[] = window
        .location
        .pathname
        .substring(1)
        .split("/");
    return pathElements.length > 1 ? 
        pathElements[1] :
        '';
}

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

}