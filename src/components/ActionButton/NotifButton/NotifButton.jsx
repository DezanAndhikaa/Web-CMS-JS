import React from 'react';
import './NotifButton.scss';
import Badge from '@material-ui/core/Badge';
import { IconNotif, IconHistory } from '../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';

const Badges = withStyles(theme => ({
	badge: {
		left: -5,
		fontSize: '10px',
		border: '2px solid white'
	},
}))(Badge);

class NotifButton extends React.PureComponent {
	render() {
		if(this.props.titles === "Notif"){
            return(
                <div className="notif-history">
                    <Badges badgeContent={57} color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                        <img src={IconNotif} className="icon-notif" alt="" /> <span className="label-notif">Notification</span>
                    </Badges>
                </div>
            )
        } else if (this.props.titles === "History"){
            return(
                <div className="notif-history">
                    <Badge color="secondary" variant="dot" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                        <img src={IconHistory} className="icon-notif" alt="" /><span className="label-history">Tracking History</span>
                    </Badge>
                </div>
            )
        }
	}
}

export default NotifButton;