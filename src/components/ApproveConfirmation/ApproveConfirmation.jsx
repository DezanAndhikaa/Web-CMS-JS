

import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { ImgSendtoEdit } from '../../assets/imgs';
import './ApproveConfirmation.scss';
import CloseNotif from '../CloseNotif/CloseNotif';

export default class ApproveConfirmation extends React.PureComponent {
	render() {
		return (
			<Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
				<DialogContent className="confirmation-modal-content">
					<div className="confirmation-modal">
						<CloseNotif onClose={this.props.onClose}/>
						<div className="confirmation-container">
							<p className="confirmation-title">Confirmation</p>
							<p className="confirmation-title">Approved</p>
							<img className="confirmation-image" src={ImgSendtoEdit} alt="" />
							<p className="confirmation-caption">Are you sure want to Approve <b> {this.props.totalData} items</b>?</p>
							<div className="btn-row">
								<Button className="button-rejected" onClick={this.props.onClose}>No</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<Button className="button-approved" onClick={this.props.onApprove}>Yes</Button>
							</div>
						</div>
					</div>
				</DialogContent>
			</Modal>
		);
	}
}
