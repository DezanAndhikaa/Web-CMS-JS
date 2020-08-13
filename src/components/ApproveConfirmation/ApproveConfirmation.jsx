import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { ImgSendtoEdit } from '../../assets/imgs';
import './ApproveConfirmation.scss';
import CloseNotif from '../CloseNotif/CloseNotif';

export default class ApproveConfirmation extends React.PureComponent {
	constructor(props){
        super(props);
        this.state ={ 
            limitText: (this.props.field === "edit" ? this.props.values : '')
        }
	}
	
	render() {
		if(this.props.idApprove === "RevLt"){
			return (
				<Modal open={this.props.openModal} className="modal-container-approve">
					<DialogContent className="approve-confirmation-content">
						<div className="confirmation-modal-approve">
							<CloseNotif onClose={this.props.onCloseRev}/>
							<div className="confirmation-container-approve">
								<p className="confirmation-title-approve">Confirmation</p>
								<p className="confirmation-title-approve2">Revised</p>
								<img className="confirmation-image-approve" src={ImgSendtoEdit} alt="" />
								<p className="confirmation-caption-approve">Are you sure want to Edit <b>{this.props.dataLf} to {this.props.dataRev} ?</b></p>
								<div className="btn-row">
									<Button className="button-rejected" onClick={this.props.onCloseRev}>No</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<Button className="button-approved" onClick={ () => {this.props.onStats(this.props.id, this.state.limitText); this.props.onClose()} }>Yes</Button>
								</div>
							</div>
						</div>
					</DialogContent>
				</Modal>
			);
		}
		else{
			return (
				<Modal open={this.props.openModal} className="modal-container-approve">
					<DialogContent className="approve-confirmation-content">
						<div className="confirmation-modal-approve">
							<CloseNotif onClose={this.props.onClose}/>
							<div className="confirmation-container-approve">
								<p className="confirmation-title-approve">Confirmation</p>
								<p className="confirmation-title-approve2">Approved</p>
								<img className="confirmation-image-approve" src={ImgSendtoEdit} alt="" />
								<p className="confirmation-caption-approve">Are you sure want to Approve <b> {this.props.totalData} items</b>?</p>
								<div className="btn-row">
									<Button className="button-rejected" onClick={this.props.onClose}>No</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<Button className="button-approved" onClick={ () => {this.props.renderSakses(); this.props.onApprove(); this.props.onClose() }}>Yes</Button>
								</div>
							</div>
						</div>
					</DialogContent>
				</Modal>
			);
		}
	}
}
