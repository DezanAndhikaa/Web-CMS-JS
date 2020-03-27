

import React from 'react';
import './Message.scss';

class Message extends React.PureComponent {
  render() {
    return (
      <div className="error-message">
        <h4 className="message-title">
          {this.props.type}
        </h4>
        <p className="message-content">
          {this.props.message}
        </p>
      </div>
    );
  }
}

export default Message;
