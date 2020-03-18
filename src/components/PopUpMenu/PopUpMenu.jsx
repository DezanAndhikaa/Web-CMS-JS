import React from 'react';
import './PopUpMenu.scss';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

export default class PopUpMenu extends React.PureComponent {
  render() {
    
    return (
      <Paper className="pop-up">
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Tracking History</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Setting</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Log Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
}
