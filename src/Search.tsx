import React, { useState } from 'react';
import SearchHeader from './SearchHeader';
import Header from './Header';
import SearchResults from './SearchResults';
import { ResultType } from './SearchResults';
import { doSearch, readEntity } from './utils';
import { EMPTY } from './constants';
import SearchStatus from './SearchStatus';

export interface SearchProps {
    user: string;
    setAuthorised(authorised: boolean): void;
    registryName: string;
    entityId: string;
}

const EMPTY_SEARCH_RESULTS: ResultType[] = new Array<ResultType>(); 

const Search = (props: SearchProps): any => {
    
    const { user,  setAuthorised, registryName, entityId } = props;
    
    const [ searchResults, setSearchResults ] = useState(EMPTY_SEARCH_RESULTS); 
    const [ status, setStatus] = useState(EMPTY);
    
    const findSingleEntity = (entityId: string): ResultType[] => {
        let result: ResultType[] = [];
        readEntity(registryName, entityId).then((entity: any) => result.push(entity));
        setStatus(EMPTY);
        return result;
    }

    const search = (searchValue: string): ResultType[] => {

        if (Boolean(entityId)) {
            return findSingleEntity(entityId);
        } else {
            doSearch(searchValue, registryName).then((response) => {
                if(response.length > 0){
                    setStatus("Found " + response.length + " entities.");
                } else {
                    setStatus("No entities found");
                }
                setSearchResults(response);
            });
            return (searchResults as ResultType[]);
        }
    }
   
    const spinner = false;
    
    return (
        <div>
            <Header 
                spinner={spinner}
                user={user} 
                setAuthorised={setAuthorised}
            />
            <SearchStatus status={status}/>
            <SearchHeader 
                search={search} 
                registryName={registryName}
            />
            <SearchResults 
                searchResults={searchResults} 
                registryName={registryName}
            />
        </div>
    );
}

export default Search;