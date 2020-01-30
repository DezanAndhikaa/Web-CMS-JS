import React, { useState } from 'react';
import './NotifButton.scss';
import {Badge, Button, Menu, MenuItem, Popover} from '@material-ui/core/';
// import Popover, {PopoverAnimationVertical} from 'material-ui/core/Popover';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IconNotif, IconHistory } from '../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
// import { Menu } from '../../../constants';
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

    constructor(props) {
        super(props);
    
        this.state = {
          displayMenu: false,
        };
      }
    
      showDropdownMenu = (event) => {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
          document.addEventListener('click', this.hideDropdownMenu);
        });
      }
    
      hideDropdownMenu = async() => {
        this.setState({ displayMenu: false }, () => {
          document.removeEventListener('click', this.hideDropdownMenu);
        });
        // await this.props.onClickButton();
      }
    
      selectItem = (item) => {
        this.props.onSelectAction(this.props.onSelectActionType, item);
      }
    
      handleClick = (menu, subMenu) => {
          this.props.push(menu);
        }
    
      renderDropdown() {
        return (
            <Button className="notif-history" onClick={this.showDropdownMenu}>
                <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                    <img src={IconHistory} className="icon-notif" alt="" /><span className="label-history">Tracking History</span>
                </DotBadges>
            </Button>
        );
      }
    
      renderDropdownList() {
        return (
          <div className="list-tracking">
              <Button className="list-item-tracking" variant="outlined">
                Sales Order
              </Button>
              <Button className="list-item-tracking" variant="outlined">
               Service Order
              </Button>
          </div>
        );
      }

	render() {
		// if(this.props.titles === "Notif"){
            return(
                <Button className="notif-history">
                    <Badges badgeContent={57} color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                        <img src={IconNotif} className="icon-notif" alt="" /> <span className="label-notif">Notification</span>
                    </Badges>
                </Button>
            )
        // } else if (this.props.titles === "History"){
        //     return(
        //         <div className="badan">
        //             {this.renderDropdown()}
        //             {
        //             this.state.displayMenu && this.renderDropdownList()  
        //             }
        //         </div>
        //         <Button className="notif-history" onClick={this.showDropdownMenu}>
        //             <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
        //                 <img src={IconHistory} className="icon-notif" alt="" /><span className="label-history">Tracking History</span>
        //             </DotBadges>
        //         </Button>
        //     )
        // } 
	}
}

export default withRouter(NotifButton);