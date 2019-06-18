import { API } from 'aws-amplify';
    
export const fetchCognitoUserGroups: any = (userObject: any) => {
        return userObject.signInUserSession.accessToken.payload['cognito:groups'];
}

export const fetchRegistries = () => {
        return API.get('entity', '/registry', {});
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
