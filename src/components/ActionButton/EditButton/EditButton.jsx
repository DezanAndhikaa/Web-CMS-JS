import React from 'react';
import InputText from '../../InputText/InputText'
import { Modal } from '@material-ui/core'
import './EditButton.scss';
import ApproveConfirmation from '../../ApproveConfirmation/ApproveConfirmation';

// const validationSchema = Yup.object().shape({
//     limitText: Yup.number()
//     .typeError('Harus Angka')
// })

class EditButton extends React.PureComponent {

    constructor(props){
        super(props);
        this.state ={ 
            isShowModal: false,
            isShowModalConfirm: false,
            putLf: ''
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

    isClosedModal = () => {
        this.setState({
            isShowModal: false,
            isShowModalConfirm: !this.state.isShowModalConfirm
        })
    }

    getRevLf = (value) => {
        this.setState({
            putLf: value
        })
    }

    renderConfirmModal() {
        return(
            <ApproveConfirmation
                {...this.props}
                idApprove="RevLt" 
                openModal={this.state.isShowModalConfirm} 
                onCloseRev={this.isOpenModal}
                onClose={this.isClosedModal}            
                dataLf={this.props.lifetime}
                // dataRev={this.props.revLifetime}
                dataRev={this.state.putLf}
            />
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
                                    dataRevLt={this.getRevLf}

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