import React from 'react';
import './DeleteButton.scss';

class DeleteButton extends React.PureComponent {
	render() {
		return (
			<div className="del-button-row">
				<div className="del-button" onClick={this.props.onClick}/>
			</div>
		);
	}
}

export default DeleteButton;