import React from 'react'
import './FilterByPeriodeDate.scss'
import CloseButton from '../../components/CloseButton/CloseButton'
import { Button, TextField, FormHelperText } from '@material-ui/core'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class FilterByPeriodeDate extends React.Component{

    state = {
        startDate: new Date()
    };

    handleChange = date => {
        this.setState({
            startDate: date
        })
        alert(this.state.startDate)
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
                    <label className="teks-left">From</label>    
                    <label className="teks-right">To</label>
                </div>
                <div className="top-midel">
                    <div className="box"/>
                    <DatePicker
                        className="dates"
                        dateFormat="dd-MM-yyyy"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    />
                    <DatePicker
                        className="dates2"
                        dateFormat="dd-MM-yyyy"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    />
                </div>
                
                <div className="bottom-rows">
                    <Button className="btn-search" onClick={this.props.onStats}>Search Plan</Button>
                </div>
            </div>
        )
    }
}

export default FilterByPeriodeDate