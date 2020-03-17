import React from 'react'
import './InputText.scss'
import CloseButton from '../../components/CloseButton/CloseButton'
import { Button, TextField, FormHelperText } from '@material-ui/core'
import * as Yup from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';

const validationSchema = Yup.object().shape({
    limitText: Yup.number()
    .typeError('Harus Angka')
})

class InputText extends React.Component{

    constructor(props){
        super(props);
        this.state ={ 
            limitText: (this.props.field === "edit" ? this.props.values : '')
        }
    }
    
    handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    render(){
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
                    {this.props.idInput === "EditSite" ? 
                        <Button className="btn-input" onClick={ () => {this.props.openConfirmModal(); this.props.dataRevLt(this.state.limitText)}}>Input</Button> :
                        <Button className="btn-input" onClick={ () => {this.props.onStats(this.props.id, this.state.limitText); this.props.onClosed()} } >Input</Button>
                    }                    
                </div>
            </div>
        )
    }
}

export default InputText