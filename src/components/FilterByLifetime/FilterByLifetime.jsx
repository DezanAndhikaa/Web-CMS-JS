import React from 'react'
import './FilterByLifetime.scss'
import CloseButton from '../../components/CloseButton/CloseButton'
import { Button, TextField, FormHelperText } from '@material-ui/core'

class FilterByLifetime extends React.Component{

    render(){
        return(
            <div className="assign-lifetime-modal">
                <div className="top-row">
                    <div className="ut-underline"/>
                    <p className="select-input-title">{this.props.title}</p>
                    <CloseButton onClose={this.props.onClosed}/>
                </div>
                <div className="teks-middle">
                    <label className="teks-left">Min</label>    
                    <label className="teks-right">Max</label>
                </div>
                <div className="top-midel">
                    <input className="input-left" ></input>
                    <input className="input-right"></input>
                </div>
                
                <div className="bottom-rows">
                    <Button className="btn-search" onClick={this.props.onStats}>Search Lifetime</Button>
                </div>
            </div>
        )
    }
}

export default FilterByLifetime