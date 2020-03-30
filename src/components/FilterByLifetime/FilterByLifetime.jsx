import React from 'react';
import './FilterByLifetime.scss';
import CloseButton from '../../components/CloseButton/CloseButton';
import { Button } from '@material-ui/core';

class FilterByLifetime extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            value1: '',
            value2: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name] : value
        })
    }

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
                    <input className="input-left" name="value1" onChange={this.handleChange} value={this.state.value1}></input>
                    <input className="input-right" name="value2" onChange={this.handleChange} value={this.state.value2}></input>
                </div>
                
                <div className="bottom-rows">
                    <Button className="btn-search" onClick={ () => {this.props.onFilter(this.state.value1, this.state.value2); this.props.onClosed()}} >Search Lifetime</Button>
                </div>
            </div>
        )
    }
}

export default FilterByLifetime