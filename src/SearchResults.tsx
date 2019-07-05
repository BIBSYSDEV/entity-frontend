import React from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import ResultPresentation from './ResultPresentation';
import List from '@material-ui/core/List';

const styles = createStyles({
    toolBar: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
});

export interface SearchResultProps extends WithStyles<typeof styles> {
    searchResults: ResultType[];
}

export interface ResultType {
    id: string;
}

const SearchResults = (props: SearchResultProps): any => {

    const { searchResults } = props;

    
    const renderSearchResults = () => {
        const presentation = searchResults.map((result: ResultType) => {
            return (<List       
                    component="nav"
                    aria-labelledby="nested-list-subheader"><ResultPresentation result={result} />
                   </List>) 
        });
        
        return (<ul>{presentation}</ul>);
                
    }
    
    return (Boolean(searchResults) && (searchResults as ResultType[]).length > 0) ? renderSearchResults() : '';
}

export default withStyles(styles)(SearchResults);