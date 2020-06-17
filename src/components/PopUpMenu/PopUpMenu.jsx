import React from 'react';
import './PopUpMenu.scss';
import LogOut from '@material-ui/icons/PowerSettingsNew';
import Setting from '@material-ui/icons/BrightnessLow';
import HistoryIcon from '@material-ui/icons/History';
import { Menu, StorageKey } from '../../constants';
import { ListItemIcon, MenuItem, MenuList, Modal, Paper, Typography } from '@material-ui/core';
import LogoutModal from '../../views/Logout/Logout';

export default class PopUpMenu extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLogoutModalShown: true
    };
  }

  handleLogout = () => {
    localStorage.removeItem(StorageKey.USER_DATA);
    this.props.logout();
    this.props.onLogout();
    this.setState({ isLogoutModalShown: false });
    this.props.push(Menu.LOGIN);
  };

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
  }

  onClickOpenModalLogout = e => {

    this.setState({
      isLogoutModalShown: true
    })

    console.log(this.state.isLogoutModalShown);
  }

  onClickLogOut() {
    return (
      <LogoutModal
        {...this.props}
        open={this.state.isLogoutModalShown}
        onYesClicked={this.handleLogout}
        onNoClicked={() => this.setState({ isLogoutModalShown: false })}
      />
    )
  }

  render() {
    return (
      <Modal className="pop-up" open={this.props.openModal}>
        <Paper>
          <MenuList>
            <MenuItem onClick={() => this.handleClick(Menu.PLANNING_TRACKING_HISTORY)}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <Typography variant="inherit">Tracking History</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Setting />
              </ListItemIcon>
              <Typography variant="inherit">Setting</Typography>
            </MenuItem>
            <MenuItem onClick={this.onClickOpenModalLogout}>
              <ListItemIcon>
                <LogOut />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>Log Out</Typography>
              <LogoutModal
                {...this.props}
                open={this.isLogoutModalShown}
                onYesClicked={this.handleLogout}
                onNoClicked={() => this.setState({ isLogoutModalShown: false })}
              />
            </MenuItem>
          </MenuList>
        </Paper>
      </ Modal>
    );
  }
}
