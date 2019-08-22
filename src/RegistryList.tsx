import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { fetchApiKey } from './utils';

export interface DataProps {
    registries: string;
    setApiKey(apiKey: string): void;
}


const RegistryList = (props: DataProps): any => {

    const { registries, setApiKey } = props;

    const renderListItems = (): object => {
        return JSON.parse(registries).map((registry: string): object =>
            <li key={registry}>
                <Link to={registry} style={{textDecoration: 'none'}}><Button onClick={() => fetchApiKey(registry, setApiKey)}>{registry}</Button></Link>
            </li>); 
    };

    const listItems = useRef(renderListItems());

    return (
        <ul>{listItems.current}</ul>
    );
}

export default RegistryList;
