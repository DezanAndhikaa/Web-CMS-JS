import React from 'react';
import './SaveButton.scss';

class SaveButton extends React.PureComponent {
	render() {
		return (
			<div className="save-button-row">
				<div className="save-button" onClick={this.props.onClose} />
			</div>
		);
	}
}

export default SaveButton;