import React from 'react';
import './CloseNotif.scss';

export default class CloseNotif extends React.PureComponent {
  render() {
    return (
      <div className="close-btn-row">
        <div className="close-btn" onClick={this.props.onClose} />
      </div>
    );
  }
}
