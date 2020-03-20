import React from 'react';
import './PopUpMenu.scss';
import LogOut from '@material-ui/icons/PowerSettingsNew';
import Setting from '@material-ui/icons/BrightnessLow';
import HistoryIcon from '@material-ui/icons/History';
import { Menu } from '../../constants';
import { ListItemIcon,MenuItem, MenuList, Modal, Paper, Typography } from '@material-ui/core';

export default class PopUpMenu extends React.PureComponent {

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
  }

  render() {
    return (
      <Modal className="pop-up" open={this.props.openModal} onClose={this.props.closeModal}>
        <Paper>
          <MenuList>
            <MenuItem onClick={() => this.handleClick(Menu.PLANNING_TRACKING_HISTORY)}>
              <ListItemIcon>
                <HistoryIcon/>
              </ListItemIcon>
              <Typography variant="inherit">Tracking History</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Setting/>
              </ListItemIcon>
              <Typography variant="inherit">Setting</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <LogOut/>
              </ListItemIcon>
              <Typography variant="inherit" noWrap>Log Out</Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </Modal>
    );
  }
}
