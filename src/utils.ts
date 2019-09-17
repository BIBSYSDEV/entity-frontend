import { API, Auth } from 'aws-amplify';
import SecretsManager from 'aws-sdk/clients/secretsmanager';
import { Actions } from '@jsonforms/core';
import uuidv4 from 'uuid';

import schema from './schema.json';
import config from './config';
import Broader from './components/Broader';
import broaderTester from './components/BroaderTester';
import Narrower from './components/Narrower';
import narrowerTester from './components/NarrowerTester';
import Related from './components/Related';
import relatedTester from './components/RelatedTester.js';
import { EMPTY, RDFLanguageCodes } from './constants';
import { MultipleLabelType } from './types/form';

export const fetchCognitoUserGroups = (userObject: any): string[] => {
	return userObject.signInUserSession.accessToken.payload['cognito:groups'];
};

export const fetchRegistries = async () => {
	let registries: string[] = [];
	await API.get('entity', '/registry', {}).then((data): void => {
		registries = data as string[];
	});
	return registries;
};

export const fetchApiKey = (registryName: string, setApiKey: (apiKey: string) => void): void => {
	Auth.currentCredentials().then((credentials): any => {
		const options: object = {
			apiVersion: '2017-10-17',
			credentials: Auth.essentialCredentials(credentials),
		};
		const secretsManager = new SecretsManager(options);
		secretsManager.getSecretValue(
			{
				SecretId: 'entity_frontend',
				VersionStage: 'AWSCURRENT',
			},
			(err, data): void => {
				setApiKey(JSON.parse(data.SecretString as string)[registryName]);
			}
		);
	});
};

export const initialiseStore = (dispatch: any, data: any, schema: any, uischema: any) => {
	dispatch(Actions.init(data, schema, uischema));
	dispatch(Actions.registerRenderer(narrowerTester, Narrower));
	dispatch(Actions.registerRenderer(broaderTester, Broader));
	dispatch(Actions.registerRenderer(relatedTester, Related));
};

export const readEntity = async (registryName: string, entityId: string) => {
	const data = await API.get('entity', `/registry/${registryName}/entity/${entityId}`, {
		headers: {
			Accept: 'application/ld+json',
		},
	});

	return data;
};

export const writeEntity = async (registryName: string, entityId: string, apiKey: string, entity: any) => {
	entity.modified = convertDateToISOString(new Date());
	const bodyObject: any = {
		body: entity,
	};

	if (entityId) {
		const id = entityId.split('/').pop();
		bodyObject.id = id;
		return await API.put('entity', `/registry/${registryName}/entity/${id}`, {
			headers: { 'api-key': apiKey },
			body: bodyObject,
		});
	} else {
		const newId = uuidv4();
		bodyObject.id = newId;
		bodyObject.body['@context'] = `${config.apiGateway.URL}/json-ld/context`;
		bodyObject.body['localIdentifier'] = await createLocalIdentifier(newId, registryName);
		return await API.post('entity', '/registry/' + registryName + '/entity/', {
			headers: { 'api-key': apiKey },
			body: bodyObject,
		});
	}
};

export const readSchema = async (registryName: string, apiKey: string) => {
	//      const entitySchema = await API.get('entity', "/registry/" + registryName + "/schema", {headers: {'api-key': apiKey}});
	//      transform entitySchema to jsonSchema
	//      return entitySchema
	return schema;
};

export const getLocalIdentifierCode = async (registryName: string) => {
	const data = await API.get('entity', `/registry/concept-schemes/entity/${registryName}`, {
		headers: {
			Accept: 'application/ld+json'
		}
	});
	if (data.localIdentifierCode) {
		return data.localIdentifierCode;
	} else {
		return EMPTY;
	}
};

const createLocalIdentifier = async (id: string, registryName: string): Promise<string> => {
	const localIdentifierCode = await getLocalIdentifierCode(registryName);

	return `${localIdentifierCode}${id}`;
};

export const createRegistryUri = (registryName: string) => {
	return 'http://unit.no/entitydata#' + registryName.toLowerCase();
};

export const doSearch = (query: string, registryName: string) =>
	API.get('entity', '/registry/' + registryName + '/search?query=' + query, null);

export const getUniqueItemsInArray = (array: any) => {
	return array.filter((item: any, index: number, self: any) => self.indexOf(item) === index);
};

export const getNorwegianLabelFirst = (listOfLabels: MultipleLabelType[]): string => {
	let label: string = EMPTY;
	const firstItemInArray = listOfLabels[0].value;

	if (listOfLabels.length === 1) {
		label = firstItemInArray;
	} else {
		label =
			getNorwegianBokmalLabel(listOfLabels) ||
			getNorwegianNynorskLabel(listOfLabels) ||
			getEnglishLabel(listOfLabels) ||
			firstItemInArray;
	}
	return label;
};

export const getNorwegianBokmalLabel = (list: MultipleLabelType[]): string | undefined => {
	let label: string = EMPTY;
	list.forEach(element => {
		if (element.language === RDFLanguageCodes.NORWEGIAN_BOKMAL) {
			label = element.value;
		}
	});
	return label !== EMPTY ? label : undefined;
};

export const getNorwegianNynorskLabel = (list: MultipleLabelType[]) => {
	let label: string = EMPTY;
	list.forEach(element => {
		if (element.language === RDFLanguageCodes.NORWEGIAN_NYNORSK) {
			label = element.value;
		}
	});
	return label !== EMPTY ? label : undefined;
};

export const getEnglishLabel = (list: MultipleLabelType[]) => {
	let label: string = EMPTY;
	list.forEach(element => {
		if (element.language === RDFLanguageCodes.ENGLISH) {
			label = element.value;
		}
	});
	return label !== EMPTY ? label : undefined;
};

export const convertDateToISOString = (date: Date) => {
	return date.toISOString().split('T')[0];
};
