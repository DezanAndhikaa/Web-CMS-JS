import React from 'react';
import './PopUpMenu.scss';
import LogOut from '@material-ui/icons/PowerSettingsNew';
import Setting from '@material-ui/icons/BrightnessLow';
import HistoryIcon from '@material-ui/icons/History';
import { Menu } from '../../constants';
import { ListItemIcon,MenuItem, MenuList, Modal, Paper, Typography } from '@material-ui/core';

export default class PopUpMenu extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLogoutModalShown: true
    };
  }

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
  }

<<<<<<< HEAD
=======
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

>>>>>>> 28b003a7d771fc20a9d05433516b7ccf41c78b72
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
<<<<<<< HEAD
            <MenuItem onClick={this.props.onClickMenuLogout}>
              <ListItemIcon>
                <LogOut />
              </ListItemIcon>
              <Typography variant="inherit" noWrap >Log Out</Typography>
=======
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
>>>>>>> 28b003a7d771fc20a9d05433516b7ccf41c78b72
            </MenuItem>
          </MenuList>
        </Paper>
      </ Modal>
    );
  }
}
