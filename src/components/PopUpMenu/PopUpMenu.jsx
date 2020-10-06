import React from 'react';
import './PopUpMenu.scss';
import { Menu } from 'constants/index';
import { MenuItem, MenuList, Modal, Paper, Typography } from '@material-ui/core';

export default class PopUpMenu extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLogoutModalShown: false
    };
  }

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
  }

  render() {
    return (
      <Modal className="pop-up" open={this.props.openModal} onClose={this.props.closeModal}>
        <Paper className= "paper-menu">
          <MenuList className="menu-list">
            <MenuItem className= "menu-item1" onClick={() => this.handleClick(Menu.PLANNING_TRACKING_HISTORY)}>
              <Typography className= "menu-label" variant="inherit">Tracking History</Typography>
            </MenuItem>
            <MenuItem className= "menu-item2">
              <Typography className= "menu-label" variant="inherit">Setting</Typography>
            </MenuItem>
            <MenuItem className= "menu-item3" onClick={this.props.onClickMenuLogout}>
              <Typography className= "menu-label" variant="inherit" noWrap >Log Out</Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </Modal>
    );
  }
}