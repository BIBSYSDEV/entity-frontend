import React from 'react';
import ResultPresentation from './ResultPresentation';
import List from '@material-ui/core/List';

export interface SearchResultProps {
    searchResults: ResultType[];
    registryName: string;
}

export interface ResultType {
    id: string;
}

const SearchResults = (props: SearchResultProps): any => {

    const { searchResults, registryName } = props;

    const renderSearchResults = () => {
        const presentation = searchResults.map((result: ResultType) => {
            return (<List       
                component="nav" key={result.id}
                aria-labelledby="nested-list-subheader"><ResultPresentation result={result} registryName={registryName}/>
            </List>) 
        });
        
        return (<ul>{presentation}</ul>);

    }
    
    return (Boolean(searchResults) && (searchResults as ResultType[]).length > 0) ? renderSearchResults() : '';
}

export default SearchResults;