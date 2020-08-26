import React from 'react';
import './FilterByPeriodeDate.scss';
import CloseButton from '../../components/ActionButton/CloseButton/CloseButton';
import { Button } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

class FilterByPeriodeDate extends React.Component{

    constructor(props) {
        super(props);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.state = {
            dateValue: {
                startDate: new Date(), 
                endDate: new Date()
            }
        };
        console.log(props)
    }

    handleChangeStart = (event, props) => {
        props.setFieldValue("startDate", event);
    }

    handleChangeEnd = (event, props) => {
        props.setFieldValue("endDate", event);
    }

    // isDisabled(props) { return props.errors.startDate || props.errors.endDate }

    render(){
        const today = new Date();        
        const validationSchema = Yup.object().shape({
            startDate: Yup.date()
            .required('Start date must be filled.'),
            
            endDate: Yup.date()
            .required('End date must be filled.')
        });
        return(
            <Formik
                initialValues={this.state.dateValue}
                validationSchema={validationSchema}
            >

                {( props ) => (
                    <Form>
                        <div className="assign-date-modal">
                            <div className="top-row">
                                <div className="ut-underline"/>
                                <p className="select-input-title">{this.props.title}</p>
                                <CloseButton idBtnClose="NonConfirmModal" onClose={this.props.onClosed}/>
                            </div>
                            <div className="teks-middle-date">
                                <label className="teks-left-date">From </label>
                                <label className="teks-right-date">Up to</label>
                            </div>
                            <div className="top-midel">
                                <div className="box"/>
                                <DatePicker
                                    name= "startDate"
                                    className= "dates"
                                    dateFormat= "dd-MM-yyyy"
                                    selected= {props.values.startDate}
                                    value= {props.values.startDate}
                                    onChange= { e => this.handleChangeStart(e, props)}
                                />
                                <DatePicker
                                    name= "startDate2"
                                    className= "dates2"
                                    dateFormat= "dd-MM-yyyy"
                                    selected={props.values.endDate}
                                    value= {props.values.endDate}
                                    onChange= {e => this.handleChangeEnd(e, props)}
                                />
                            </div>
                            <div className="label-error">
                                {props.errors.startDate ? (
                                    <div className="label-error1">{props.errors.startDate}</div>
                                ) : null}
                                {props.errors.endDate ? (
                                    <div className="label-error2">{props.errors.endDate}</div>
                                ) : null}
                            </div>
                            <div className="bottom-rows-date">
                                <Button 
                                    disabled={props.errors.startDate || props.errors.endDate}
                                    className={props.errors.startDate || props.errors.endDate ? "btn-search-date-disabled" : "btn-search-date" }
                                    onClick={ () => {this.props.onFilter(moment(props.values.startDate).format('YYYY-MM-DD'), 
                                    moment(props.values.endDate).format('YYYY-MM-DD')); this.props.onClosed() }} 
                                >
                                    {this.props.titles === "SMR DATE" ? "Search SMR Date" : "Search Plan" }
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }
}

export default FilterByPeriodeDate