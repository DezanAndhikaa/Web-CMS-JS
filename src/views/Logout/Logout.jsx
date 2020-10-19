import React from 'react';
import './Logout.scss';
import { DialogContent, Button, Modal } from '@material-ui/core';
import { Logout }  from 'assets/imgs';

export default class LogoutModal extends React.PureComponent {
	render() {
		return (
			<Modal open={this.props.openModal} className="modal-container-logout">
				<DialogContent className="logout-confirmation-content">
					<div className="confirmation-modal-logout">
						<div className="confirmation-container-logout">
							<p className="confirmation-title-logout">Log Out</p>
							<img className="confirmation-image-logout" src={process.env.PUBLIC_URL +Logout} alt="" />
							<p className="confirmation-caption-logout">Are you sure want to Log Out ?</p>
							<div className="btn-row">
								<Button className="button-yes" onClick={this.props.onYesClicked}>Yes</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<Button className="button-no" onClick={this.props.onNoClicked}>No</Button>
							</div>
						</div>
					</div>
				</DialogContent>
			</Modal>
		);
	}
}