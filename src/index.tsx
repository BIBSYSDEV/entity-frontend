import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, Reducer, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import schema from './schema.json';
import uischema from './uischema.json';
import { Actions, jsonformsReducer, JsonFormsState } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import Amplify from 'aws-amplify';
import config from './config';
import { AWS } from '@aws-amplify/core';


const data = {
    "@context": "something",
    identifier: "12345",
    preferredLabel: [
        {
            value: "prefLabel",
            lang: "English",
        }
    ],
    alternativeLabel: [
        {
            value: "altLabel",
            lang: "English",
        }
    ],
    related: ["related"],
    definition: "definition",
    seeAlso: ["seeAlso"],
    inScheme: "schema",
};

const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognito.IDENTITY_POOL_ID
});

AWS.config.credentials = credentials; 
AWS.config.region = config.cognito.REGION;

Amplify.configure({
    Auth: {
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        mandatorySignIn: true,
    },
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

store.dispatch(Actions.init(data, schema, uischema));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
