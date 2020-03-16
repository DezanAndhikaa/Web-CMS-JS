import React from 'react';
import InputText from '../../InputText/InputText'
import { Modal } from '@material-ui/core'
import './EditButton.scss';
import CloseButton from '../../../components/CloseButton/CloseButton'
import { Button, TextField, FormHelperText } from '@material-ui/core'
import * as Yup from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import ApproveConfirmation from '../../ApproveConfirmation/ApproveConfirmation';

const validationSchema = Yup.object().shape({
    limitText: Yup.number()
    .typeError('Harus Angka')
})

class EditButton extends React.PureComponent {

    constructor(props){
        super(props);
        this.state ={ 
            isShowModal: false,
            isShowModalConfirm: false,
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

    isClicked = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    isCloseds = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    isOpenModal = () => {
        this.setState({
          isShowModal: !this.state.isShowModal,
          isShowModalConfirm: !this.state.isShowModalConfirm
        })
    }

    renderConfirmModal() {
        return(
            <ApproveConfirmation 
                idApprove="RevLt" 
                openModal={this.state.isShowModalConfirm} 
                onClose={this.isOpenModal}            
                dataLf={this.props.lifetime}
                dataRev={this.props.revLifetime}
            />
        )
    }

    renderInputText(){
        return(
            <div className="assign-mechanic-modal">
                <div className="top-row">
                    <div className="ut-underline"/>
                    <p className="select-input-title">{this.props.title}</p>
                    <CloseButton onClose={this.isCloseds}/>
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
                    <Button className="btn-cancel" onClick={this.isCloseds}>Cancel</Button>
                    <Button className="btn-input" onClick={this.isOpenModal} >Input</Button>                   
                </div>
            </div>
        )
    }

	render() {
        if(this.props.idEdit === "Approval"){
            return (
                <div className="edit-button-row">
                    <div className="edit-button-visible" onClick={this.isClicked} />
                        <Modal 
                        className="modal-pos" open={this.state.isShowModal} onClose={this.isCloseds}>
                            <div>
                                <InputText 
                                    {...this.props}
                                    {...this.state}
                                    onClosed={this.isCloseds}
                                />
                            </div>
                        </Modal>
                </div>
            );
        }
		else if(this.props.idEdit === "Rev"){
            return (
                <div className="edit-button-row">
                    <div className="table-cell-lt" onClick={this.isClicked}>{this.props.RowData}</div>
                    {this.state.isShowModal && (
                        <Modal className="modal-pos" open={this.state.isShowModal} onClose={this.isCloseds}>
                            <div>
                                <InputText 
                                    {...this.props}
                                    {...this.state}
                                    idInput="EditSite"
                                    onClosed={this.isCloseds}
                                    openConfirmModal={this.isOpenModal}
                                />
                            </div>
                        </Modal>
                    )}
                    {this.state.isShowModalConfirm && (
                        this.renderConfirmModal()
                    )}
                </div>
            );
        }
	}
}

export default EditButton;