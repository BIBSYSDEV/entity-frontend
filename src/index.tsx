import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { combineReducers, createStore, Reducer, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import schema from './schema.json';
import uischema from './uischema.json';
import { jsonformsReducer, JsonFormsState } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import Amplify from 'aws-amplify';
import config from './config';
import AWS from 'aws-sdk';
import awsmobile from './aws-exports';
import { initialiseStore, createRegistryUri } from './utils';
import { findEntityIdentifierInPath, findRegistryIdentifierInPath, readEntity, fetchApiKey } from './utils';
import { EMPTY, API_KEY, REGISTRY_NAME } from './constants';

let data: any = {
};

AWS.config.update({region: config.cognito.REGION});

Amplify.configure(awsmobile);

Amplify.configure({
    API: {
        endpoints: [
            {
                name: "entity",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    }
});


const initState: JsonFormsState = {
    jsonforms: {
        cells: materialCells,
        renderers: materialRenderers
    }
}

const rootReducer: Reducer<JsonFormsState, AnyAction> = combineReducers({ jsonforms: jsonformsReducer() });
const store = createStore(rootReducer, initState);

const getApiKey = (): string => {
    return Boolean(sessionStorage.getItem('apiKey')) ? sessionStorage.getItem('apiKey') as string : EMPTY;
}

const setApiKey = (apiKey: string): void => { 
    sessionStorage.setItem(API_KEY, apiKey);
}

const setRegistryName = (registryName: string): void => { 
    sessionStorage.setItem(REGISTRY_NAME, registryName);
}

const registryName = findRegistryIdentifierInPath();
const entityId = findEntityIdentifierInPath();

if (Boolean(registryName)) {
    
    fetchApiKey(registryName, setApiKey);
    setRegistryName(registryName);
    
    if (Boolean(entityId)) {
        readEntity(registryName, entityId, getApiKey()).then((entityData) => {
            initialiseStore(store.dispatch, entityData.body, schema, uischema);
        });
    }
}

const newEntity = (registryName: string): void => {
    (data as any) = { inScheme: createRegistryUri(registryName) }; // Correct uri in here
    initStore(data);
}

const initStore = (body: any) => {
    initialiseStore(store.dispatch, body, schema, uischema);
}

if(!Boolean(entityId)){
    console.log('init with no data');
    initStore(data);
}

ReactDOM.render(
    <Provider store={store}>
        <App 
            newEntity={newEntity}
            data={data}
            storeApiKey={setApiKey}
            setRegistryName={setRegistryName}
            initStore={initStore}
        />
    </Provider>,
    document.getElementById('root')
);
