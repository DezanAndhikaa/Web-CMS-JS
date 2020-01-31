import React from 'react'
import './FilterByPeriodeDate.scss'
import CloseButton from '../../components/CloseButton/CloseButton'
import { Button, TextField, FormHelperText } from '@material-ui/core'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

class FilterByPeriodeDate extends React.Component{

    state = {
        startDate: new Date(),
        startDate2: new Date()
    };

    handleChangeStart = date => {
        this.setState({
            startDate: date,
        })
        console.log('kurseh 1 : ',this.state.startDate)
    }

    handleChangeEnd = date => {
        this.setState({
            startDate2: date,
        })
        console.log('kurseh 2 : ',this.state.startDate2)
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
                    {/* <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={this.state.startDate}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',}}
                    /> */}
                    <DatePicker
                        className="dates"
                        dateFormat="dd-MM-yyyy"
                        selected={this.state.startDate}
                        onChange={this.handleChangeStart}
                    />
                    <DatePicker
                        className="dates2"
                        dateFormat="dd-MM-yyyy"
                        selected={this.state.startDate2}
                        onChange={this.handleChangeEnd}
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