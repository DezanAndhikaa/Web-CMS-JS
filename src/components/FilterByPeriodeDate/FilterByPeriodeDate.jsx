import React from 'react';
import './FilterByPeriodeDate.scss';
import CloseButton from '../../components/ActionButton/CloseButton/CloseButton';
import { Button } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';

class FilterByPeriodeDate extends React.Component{

    state = {
        startDate: new Date(),
        startDate2: new Date(),
        startFilter: Date(),
        endFilter: Date()
    };

    handleChangeStart = date => {
        this.setState({
            startDate: date,
            startFilter: moment(date).format('YYYY-MM-DD')
        })
    }

    handleChangeEnd = date => {
        this.setState({
            startDate2: date,
            endFilter: moment(date).format('YYYY-MM-DD')
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
                    <label className="teks-left">From </label>
                    <label className="teks-right">To</label>
                </div>
                <div className="top-midel">
                    <div className="box"/>
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
                    <Button className="btn-search" onClick={ () => {this.props.onFilter(this.state.startFilter, this.state.endFilter); this.props.onClosed() }} >Search Plan</Button>
                </div>
            </div>
        )
    }
}

export default FilterByPeriodeDate