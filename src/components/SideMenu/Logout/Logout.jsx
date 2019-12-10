

import React from 'react';
import './Logout.scss';

export default class LogoutModal extends React.PureComponent {
	render() {
		return (
			<div className="logout-modal">
				<p className="title">Are you sure you want to Logout now?</p>
				<div className="btn-container">
					<div className="btn-yes" onClick={this.props.onYesClicked}>
            Yes
					</div>
					<div className="btn-no" onClick={this.props.onNoClicked}>
            No
					</div>
				</div>
			</div>
		);
	}
}
