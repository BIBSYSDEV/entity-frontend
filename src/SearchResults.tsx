import React from 'react';
import ResultPresentation from './ResultPresentation';
import List from '@material-ui/core/List';

export interface ResultType {
    id: string;
}

const SearchResults = ({ searchResults, registryName }): any => {

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