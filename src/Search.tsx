import React, { useState } from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';
import { ResultType } from './SearchResults';

const styles = createStyles({
});

export interface SearchProps extends WithStyles<typeof styles> {
}

let testData: object[] = [
                  {
                      '@context': 'something',
                      'identifier': '12345',
                      preferredLabel: [
                        {
                          'value': 'prefLabel',
                          'lang': 'English'
                        },
                        {
                          'value': 'Pref2',
                          'lang': 'Nynorsk'
                        }
                      ],
                      alternativeLabel: [
                        {
                          'value': 'altLabel',
                          'lang': 'English'
                        }
                      ],
                      related: [
                        'related'
                      ],
                      definition: 'definition',
                      seeAlso: [
                        'seeAlso'
                      ],
                      inScheme: 'schema'
                    },
//                  {
//                      id: '456456456456',
//                      preferredLabel: {
//                          lang: 'EN',
//                          value: 'Not preferred label',
//                      }
//                  },
];

const EMPTY_SEARCH_RESULTS: ResultType[] = new Array<ResultType>(); 

const Search = (props: SearchProps): any => {
    
    const [ searchResults, setSearchResults ] = useState(EMPTY_SEARCH_RESULTS); 
    
    const search = (searchValue: string): ResultType[] => {
        setSearchResults((testData as ResultType[]));
        return (testData as ResultType[]);
    }
    
    return (
        <div>
            <SearchHeader search={search} />
            <SearchResults searchResults={searchResults} />
        </div>
    );
}


export default withStyles(styles)(Search);