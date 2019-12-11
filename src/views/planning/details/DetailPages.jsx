import React from 'react'
import InputButton from '../../../components/Button/InputButton'
import SaveButton from "../../../components/ActionButton/SaveButton/SaveButton";
import EditButton from "../../../components/ActionButton/EditButton/EditButton";
import Searchbar from "../../../components/Searchbar/SearchInput";
import FilterbyDataAction from '../../../components/FilterByDataAction/FilterbyDataAction';

class DetailPages extends React.Component{

    render(){
        return(
            <main className="content">
                <InputButton/>
                <br></br>
                <div>
                    <Searchbar /> &nbsp;&nbsp;&nbsp;&nbsp;
                    <FilterbyDataAction />
                </div>
                <SaveButton/>
                <br></br>
                <EditButton/>
            </main>
        )
    }
}

export default DetailPages;
