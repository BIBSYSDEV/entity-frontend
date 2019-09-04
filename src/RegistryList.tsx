import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { fetchApiKey } from './utils';

export interface DataProps {
	registries: string;
	setApiKey(apiKey: string): void;
}

const RegistryList = (props: DataProps) => {
	const { registries, setApiKey } = props;
	const registryList: string[] = JSON.parse(registries);

	return (
		<ul>
			{registryList.length > 0 &&
				registryList.map(registry => (
					<li key={registry}>
						<Link to={registry} style={{ textDecoration: 'none' }}>
							<Button onClick={() => fetchApiKey(registry, setApiKey)}>
								{registry}
							</Button>
						</Link>
					</li>
				))}
		</ul>
	);
};

export default RegistryList;
