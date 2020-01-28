import React from 'react';
import './NotifButton.scss';
import Badge from '@material-ui/core/Badge';
import { IconNotif, IconHistory } from '../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
import { Menu } from '../../../constants';
import { withRouter } from "react-router-dom";

const Badges = withStyles(theme => ({
	badge: {
		top: -3,
		left: -5,
		fontSize: '10px',
		border: '2px solid white'
	},
}))(Badge);

const DotBadges = withStyles(theme => ({
	badge: {
        top: -1,
		left: 4,
        border: '2px solid white',
        width: 'auto',
        minWidth: '15px',
        height: '15px',
        borderRadius: '50%'
	},
}))(Badge);

class NotifButton extends React.PureComponent {

    handleClick = (menu) => {
        console.log('skui menu', menu)
        this.props.history.push(menu);
      }
    
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
                <div className="notif-history" onClick={()=>this.handleClick(Menu.PLANNING_DETAILS_TRACKING)}>
                    <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                        <img src={IconHistory} className="icon-notif" alt="" /><span className="label-history">Tracking History</span>
                    </DotBadges>
                </div>
            )
        }
	}
}

export default withRouter(NotifButton);