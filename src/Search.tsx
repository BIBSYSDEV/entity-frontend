import React, { useState } from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import SearchHeader from './SearchHeader';
import Header from './Header';
import SearchResults from './SearchResults';
import { ResultType } from './SearchResults';

const styles = createStyles({
});

export interface SearchProps extends WithStyles<typeof styles> {
    user: string;
    setAuthorised(authorised: boolean): void;
    registryName: string;
}

let testData: object[] = [
    {identifier: "HUME00001", preferredLabel: [{ lang:"NB", value: "Humaniora"}], dato: "1994-03-21"},
    {identifier: "HUME00002", related: "HUME00001", preferredLabel: [{ lang:"NB", value: "Humanistiske fag"}], dato: "2009-10-22"},
    {identifier: "HUME00003", related: "HUME00001", preferredLabel: [{ lang:"NB", value: "Humanvitenskap"}], dato: "1994-03-21"},
    {identifier: "HUME00004", related: "HUME00001", preferredLabel: [{ lang:"NB", value: "Humord"}], dato: "1994-03-21"},
    {identifier: "HUME00005", preferredLabel: [{ lang:"NB", value: "Arkeologi"}], dato: "1995-03-01", definition: "Kulturen, livet og levemåten i eldre tider grunnet på utgravninger og funn i jorda <SNL>", broader: "HUME00001", broader1: "HUME00005", seeAlso: "HUME12563"},
    {identifier: "HUME00006", preferredLabel: [{ lang:"NB", value: "Fortidsminner"}], dato: "2009-10-22", broader: "HUME00005", broader1: "HUME00005", seeAlso: ["HUME04581", "HUME04546", "HUME12105"]},
    {identifier: "HUME00007", related: "HUME00006", preferredLabel: [{ lang:"NB", value: "Fornminner"}], dato: "2009-10-22"},
    {identifier: "HUME00008", preferredLabel: [{ lang:"NB", value: "Faste fortidsminner"}], dato: "2015-11-20", broader: "HUME00006", broader1: "HUME00005"},
    {identifier: "HUME00009", preferredLabel: [{ lang:"NB", value: "Boplasser"}], dato: "2009-10-22", broader: "HUME00008", broader1: "HUME00005", seeAlso: ["HUME09034", "HUME09054", "HUME09052"]},
    {identifier: "HUME00010", preferredLabel: [{ lang:"NB", value: "Crannog"}], dato: "2006-11-24", definition: "Befestet boplass anlagt i innsjø i Irland, Skottland og England <UBO>", broader: "HUME00009", broader1: "HUME00005", seeAlso: "HUME05291"},
    {identifier: "HUME00011", preferredLabel: [{ lang:"NB", value: "Hellere"}], dato: "2009-10-22", definition: "Overheng under bergvegg eller liten hule hvor åpningen er større enn dybden. Heller har i stor grad vært brukt som boplass og som leger under fangst og fiske <UBO>", broader: "HUME00009", broader1: "HUME00005"},
    {identifier: "HUME00012", preferredLabel: [{ lang:"NB", value: "Bygdeborger"}], dato: "2009-10-22", broader: "HUME00008", broader1: "HUME00005", seeAlso: ["HUME05293", "HUME05291"]},
    {identifier: "HUME00013", preferredLabel: [{ lang:"NB", value: "Dyregraver"}], dato: "2009-10-22", broader: "HUME00008", broader1: "HUME00005"},
    {identifier: "HUME00014", preferredLabel: [{ lang:"NB", value: "Gravplasser"}], dato: "2009-10-22", alternativeLabel: "Arkeologi", broader: "HUME00008", broader1: "HUME00005", seeAlso: "HUME08415"},
    {identifier: "HUME00015", related: "HUME00014", preferredLabel: [{ lang:"NB", value: "Gravanlegg"}], dato: "1994-03-21"},
    {identifier: "HUME00016", related: "HUME00014", preferredLabel: [{ lang:"NB", value: "Gravfelt"}], dato: "1994-03-21"},
    {identifier: "HUME00017", related: "HUME00014", preferredLabel: [{ lang:"NB", value: "Nekropoler"}], dato: "2009-10-22"},
    {identifier: "HUME00018", preferredLabel: [{ lang:"NB", value: "Graver"}], dato: "2009-10-22", broader: "HUME00014", broader1: "HUME00005"},
    {identifier: "HUME00019", preferredLabel: [{ lang:"NB", value: "Båtgraver"}], dato: "2009-10-22", broader: "HUME00018", broader1: "HUME00005"},
    {identifier: "HUME00020", preferredLabel: [{ lang:"NB", value: "Gravhauger"}], dato: "2009-10-22", broader: "HUME00014", broader1: "HUME00005"},
    {identifier: "HUME00021", preferredLabel: [{ lang:"NB", value: "Gårdshauger"}], dato: "2011-09-14", broader: "HUME00020", broader1: "HUME00005"}
]

const EMPTY_SEARCH_RESULTS: ResultType[] = new Array<ResultType>(); 

const Search = (props: SearchProps): any => {
    
    const { user,  setAuthorised, registryName } = props;
    
    const [ searchResults, setSearchResults ] = useState(EMPTY_SEARCH_RESULTS); 
    
    const search = (searchValue: string): ResultType[] => {
        if(searchValue.startsWith('identifier=')){
            setSearchResults((testData as ResultType[]));
        }
        return (searchResults as ResultType[]);
    }

    
    
    const spinner = false;
    
    return (
        <div>
            <Header 
                spinner={spinner} 
                user={user} 
                setAuthorised={setAuthorised}
            />
            <SearchHeader search={search} registryName={registryName}/>
            <SearchResults searchResults={searchResults} />
        </div>
    );
}


export default withStyles(styles)(Search);