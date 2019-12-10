import React from 'react'
import InputButton from '../../../components/Button/InputButton'
import SaveButton from "../../../components/ActionButton/SaveButton/SaveButton";
import EditButton from "../../../components/ActionButton/EditButton/EditButton";


class DetailPages extends React.Component{

    render(){
        return(
            <main className="content">
                <InputButton/>
                <SaveButton/>
                <br></br>
                <EditButton/>
            </main>
        )
    }
}

export default DetailPages;