import React from 'react'
import './InputText.scss'
import CloseButton from '../../components/CloseButton/CloseButton'

class InputText extends React.Component{
    render(){
        return(
            <div className="assign-mechanic-modal">
                <div>Input Unit Code</div>
                <CloseButton/>
            </div>
        )
    }
}

export default InputText