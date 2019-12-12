import React from 'react';
import './EditButton.scss';

class EditButton extends React.PureComponent {
	render() {
		return (
			<div className="edit-button-row">
				<div className="edit-button" onClick={this.props.onClose} />
			</div>
		);
	}
}

export default EditButton;