

import React from 'react';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { ImgSendtoEdit } from '../../assets/imgs';
import './ApproveConfirmation.scss';
import CloseNotif from '../CloseNotif/CloseNotif';

export default class ApproveConfirmation extends React.PureComponent {
	render() {
		return (
			<Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container-approve">
				<DialogContent className="approve-confirmation-content">
					<div className="confirmation-modal-approve">
						<CloseNotif onClose={this.props.onClose}/>
						<div className="confirmation-container-approve">
							<p className="confirmation-title-approve">Confirmation</p>
							<p className="confirmation-title-approve">Approved</p>
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
