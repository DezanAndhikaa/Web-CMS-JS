import React from 'react';
import InputText from '../../InputText/InputText'
import { Modal } from '@material-ui/core'
import './EditButton.scss';

class EditButton extends React.PureComponent {

	constructor(props){
        super(props);
        this.state={
            isShowModal: false
        }
    }

    isClicked = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

    isCloseds = () => {
        this.setState({isShowModal: !this.state.isShowModal})
    }

	render() {
		return (
			<div className="edit-button-row">
				<div className="edit-button" onClick={this.isClicked} />
					<Modal disableEnforceFocus
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
}

export default EditButton;