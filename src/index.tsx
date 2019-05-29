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

const data = {
    "@context": "something",
    identifier: "12345",
    preferredLabel: [
        {
            value: "prefLabel",
            lang: "EN",
        }
    ],
    alternativeLabel: [
        {
            value: "altLabel",
            lang: "EN",
        }
    ],
    related: ["related"],
    definition: "definition",
    seeAlso: ["seeAlso"],
};

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
});

const initState: JsonFormsState = {
    jsonforms: {
        cells: materialCells,
        renderers: materialRenderers
    }
}

const findRegistryIdentifierInPath = () => {
    return window
        .location
        .pathname
        .substring(1)
        .split("/")[0];
}

const registryId = findRegistryIdentifierInPath();

const rootReducer: Reducer<JsonFormsState, AnyAction> = combineReducers({ jsonforms: jsonformsReducer() });
const store = createStore(rootReducer, initState);

store.dispatch(Actions.init(data, schema, uischema));


ReactDOM.render(
    <Provider store={store}>
        <App registryId={registryId}/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
