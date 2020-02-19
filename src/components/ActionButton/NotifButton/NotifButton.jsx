import React from 'react';
import './NotifButton.scss';
import {Badge, Paper, MenuList, MenuItem, Typography} from '@material-ui/core/';
// import Popover, {PopoverAnimationVertical} from 'material-ui/core/Popover';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
  }

  renderList(){
    return(
      <Paper className="list-notif">
        <div className="list-container">
          <MenuList>
            <MenuItem>
              <Typography className="list-item-notif" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'sales')}>Sales Order</Typography>
            </MenuItem>
            <MenuItem>
              <Typography className="list-item-notif" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'service')}>Service Order</Typography>
            </MenuItem>
            <MenuItem>
              <Typography className="list-item-notif" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'service')}>Service Order</Typography>
            </MenuItem>
            <MenuItem>
              <Typography className="list-item-notif" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'service')}>Service Order</Typography>
            </MenuItem>
          </MenuList>
        </div>
      <div className="see-all-notif">
        <div className="label-notif" onClick={ () => this.handleClick(Menu.PLANNING_ALL_NOTIF) }>See All Notification</div>
      </div>
    </Paper>
    )
  }

  render() {
    if (this.props.displayMode === 'mobile') {
      return (
        <div>
          <div className="dropdown">
            {this.renderDropdown()}
          </div>
          {
            this.state.displayMenu && this.renderDropdownList()
          }
        </div>
      );
    }

    return(
      <div className="dropdown-notif">
        <div className="dropdown-button-notif" onClick={this.showDropdownMenu}>
          <div className="notif-selected-item">
            <div className="notif-history">
                <Badges badgeContent={57} color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                    <img src={IconNotif} className="icon-notif" alt="" /> <span className="label-notif">Notification</span>
                </Badges>
            </div>
          </div>
        </div>
        {
          this.state.displayMenu && this.renderList()  
        }
      </div>
    ) 
	}
}

export default withRouter(NotifButton);