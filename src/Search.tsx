import React, { useState } from 'react';
import SearchHeader from './SearchHeader';
import Header from './Header';
import SearchResults from './SearchResults';
import { ResultType } from './SearchResults';
import testSearchResult from './searchresult.json';
import { doSearch, readEntity } from './utils';

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
    
//    const testResult: ResultType[] = testSearchResult.map((hit) => JSON.parse(hit.presentation_json));

    const findSingleEntity = (entityId: string): ResultType[] => {
        let result: ResultType[] = [];
        readEntity(registryName, entityId).then((entity: any) =>result.push(entity));
        return result;
    }

    const search = (searchValue: string): ResultType[] => {

        if (Boolean(entityId)) {
            return findSingleEntity(entityId);
        } else {
            doSearch(searchValue, registryName).then((response) => {
                console.log(response);
                setSearchResults(response);
                console.log(searchResults);
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