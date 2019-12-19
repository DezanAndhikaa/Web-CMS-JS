import React from 'react'
import './InputText.scss'
import CloseButton from '../../components/CloseButton/CloseButton'
import DropDownList from '../DropdownList/DropDownList'
import { Button, TextField, FormHelperText } from '@material-ui/core'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FormikTextField } from 'formik-material-fields'
import NumberFormat from 'react-number-format';

const validationSchema = Yup.object().shape({
    limitText: Yup.number()
    .typeError('Harus Angka')
})

class InputText extends React.Component{

    constructor(props){
        super(props);
        this.state ={ 
            limitText: ''
        }
    }
    
    handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
        console.log("nilai state teks : "+this.state.limitText)
    }

    render(){
        console.log("key key kye "+ JSON.stringify(this.props))
        return(
            <div className="assign-mechanic-modal">
                <div className="top-row">
                    <div className="ut-underline"/>
                    <p className="select-input-title">{this.props.title}</p>
                    <CloseButton onClose={this.props.onClosed}/>
                </div>
                <Formik 
                    initialValues={this.state}
                    validationSchema={validationSchema}
                >
                    <div className="top-middle"> 
                        <NumberFormat 
                            className="teks"
                            customInput={TextField}
                            name="limitText"
                            value={this.state.limitText}
                            onChange={this.handleChange}
                        />
                        <FormHelperText className="label">* Don't Add Space Before and After Lifetime Component</FormHelperText>
                    </div>
                </Formik>
                <div className="bottom-row">
                    <Button className="btn-cancel" onClick={this.props.onClosed}>Cancel</Button>
                    <Button className="btn-input" onClick={() => this.props.onStats(this.state.limitText, this.props.id)}>Input</Button>
                </div>
            </div>
        )
    }
}

export default InputText