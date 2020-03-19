import React from 'react';
import './PopUpMenu.scss';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LogOut from '@material-ui/icons/PowerSettingsNew';
import Typography from '@material-ui/core/Typography';
import Setting from '@material-ui/icons/BrightnessLow';
import HistoryIcon from '@material-ui/icons/History';

export default class PopUpMenu extends React.PureComponent {
  render() {
    return (
      <Paper className="pop-up">
        <MenuList>
          <MenuItem>
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
    );
  }
}
