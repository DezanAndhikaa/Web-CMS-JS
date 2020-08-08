import React from 'react';
import './FilterByPeriodeDate.scss';
import CloseButton from '../../components/ActionButton/CloseButton/CloseButton';
import { Button } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import { Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

class FilterByPeriodeDate extends React.Component{

    constructor(props) {
        super(props);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.state = {
            startDate: new Date(),
            startDate2: new Date(),
            startFilter: Date(),
            endFilter: Date()
        };
    }

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

    handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    render(){
        const today = new Date();
        const tgl = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const valTgl = tgl.toString();

        const validationSchema = Yup.object().shape({
            startFilter: Yup.date()
            .required('Start date must be filled.')
            .max(valTgl, 'Start date must be later than today.'),
            
            endFilter: Yup.date()
            .required('End date must be filled.')
            .min(Yup.ref('startFilter'))
            .max(today, 'End date must be later than today.')
        });
        console.log('today: ', valTgl)
        console.log('startDate: ', this.state.startFilter)
        console.log('endDate: ', this.state.endFilter)
        return(
            <Formik
                initialValues={{startFilter: '', endFilter: ''}}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
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
                                    selected= {this.state.startDate}
                                    value= {this.state.startDate}
                                    onChange= {this.handleChangeStart}
                                />
                                {errors.startDate && touched.startDate ? (
                                    <div>{errors.startDate}</div>
                                ) : null}
                                <ErrorMessage name="startDate" />
                                <DatePicker
                                    name= "startDate2"
                                    className= "dates2"
                                    dateFormat= "dd-MM-yyyy"
                                    selected={this.state.startDate2}
                                    value= {this.state.startDate2}
                                    onChange= {this.handleChangeEnd}
                                />
                                {errors.startDate2 && touched.startDate2 ? (
                                    <div>{errors.startDate2}</div>
                                ) : null}
                                <ErrorMessage name="startDate2" />
                            </div>
                            <div className="bottom-rows-date">
                                <Button className="btn-search-date" onClick={ () => {this.props.onFilter(this.state.startFilter, this.state.endFilter); this.props.onClosed() }} >Search Plan</Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }
}

export default FilterByPeriodeDate