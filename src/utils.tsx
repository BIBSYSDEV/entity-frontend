import { API, Auth } from 'aws-amplify';
import SecretsManager from 'aws-sdk/clients/secretsmanager';

export const fetchCognitoUserGroups: any = (userObject: any) => {
        return userObject.signInUserSession.accessToken.payload['cognito:groups'];
}

export const fetchRegistries = async () => {
    let registries: string[] = [];
    await API.get('entity', '/registry', {}).then(data => {
        registries = (data as Array<string>);
    });
    return registries;
}

export const findRegistryIdentifierInPath = () => {
    return window
        .location
        .pathname
        .substring(1)
        .split("/")[0];
}

export const findEntityIdentifierInPath = () => {
    const pathElements: string[] = window
        .location
        .pathname
        .substring(1)
        .split("/");
    return pathElements.length > 1 ? 
        pathElements[1] :
        '';
}

export const fetchApiKey = (registryName: string, setApiKey: (apiKey: string) => void) => {
    Auth.currentCredentials().then(credentials => {
        const options: object = {
            apiVersion: '2017-10-17',
            credentials: Auth.essentialCredentials(credentials),
        };
        const secretsManager = new SecretsManager(options)
        secretsManager.getSecretValue({
            SecretId: 'entity_frontend',
            VersionStage: 'AWSCURRENT'
        }, (err, data) => {
            setApiKey(JSON.parse(data.SecretString as string)[registryName]);
        });
    });

}