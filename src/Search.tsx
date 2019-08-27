import React, { useState } from 'react';
import SearchHeader from './SearchHeader';
import Header from './Header';
import SearchResults from './SearchResults';
import { ResultType } from './SearchResults';
import testSearchResult from './searchresult.json';

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
    
    const testResult: ResultType[] = testSearchResult.hits.hit.map((hit) => JSON.parse(hit.fields.presentation_json));

    const findSingleEntity = (entityId: string): ResultType[] => {
        let result: ResultType[] = [];
        for (let index = 0; index < testSearchResult.hits.hit.length; index++) {
            if ((testResult[index] as ResultType).id === entityId) {
                result.push(testResult[index] as ResultType);
                break;
            }
        }

        return result;
    }

    const search = (searchValue: string): ResultType[] => {
        
        console.log(searchValue);

        if (Boolean(entityId)) {
            return findSingleEntity(entityId);
        } else {
            setSearchResults(testResult);
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