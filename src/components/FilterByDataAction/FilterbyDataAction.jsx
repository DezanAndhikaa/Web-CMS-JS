

import React from 'react';
import './FilterbyDataAction.scss';
import { Badge } from '@material-ui/core';
import { IconApprove, IconHistory, IconInputLT } from '../../assets/icons';
import { MenuList, MenuItem, Paper, Typography, withStyles } from '@material-ui/core';
import { Menu } from '../../constants';
import roleService from "../../utils/roleService.helper";
import { setItem } from 'storage-helper';

const RoleUser = new roleService();
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

class FilterbyDataAction extends React.Component {
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
  }

  selectItem = (item) => {
    this.props.onSelectAction(this.props.onSelectActionType, item);
  }

  handleClick = (menu, tab) => {
    this.props.push({
      pathname: menu,
      whichTab: tab
    });
    window.localStorage.setItem('whichTab', tab);
  }

  renderList(){
    return(
      <Paper className={this.props.idStatus === "DetailSite" ? "list-status-site" : "list-status" }>
        {Number(RoleUser.role()) === 2 || Number(RoleUser.role()) === 4 || Number(RoleUser.role()) === 9 || Number(RoleUser.role()) === 11
          || Number(RoleUser.role()) === 3
        ? <MenuList>
            <MenuItem>
              <Typography className="list-item-status" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'service')}>Service Order</Typography>
            </MenuItem>
          </MenuList>
        : Number(RoleUser.role()) === 5 || Number(RoleUser.role()) === 6 || Number(RoleUser.role()) === 7 || Number(RoleUser.role()) === 8 ||
          Number(RoleUser.role()) === 10 || Number(RoleUser.role()) === 12
          ? <MenuList>
              <MenuItem>
                <Typography className="list-item-status" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'sales')}>Sales Order</Typography>
              </MenuItem>
            </MenuList>
        : Number(RoleUser.role()) === 1 && localStorage.getItem('subMenu') === "/webcms/planning/approval"? 
          <MenuList>
            <MenuItem>
              <Typography className="list-item-status" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL_STATUS, 'service')}>Service Order</Typography>
            </MenuItem>
          </MenuList>
        : Number(RoleUser.role()) === 1 && localStorage.getItem('subMenu') === "/webcms/planning/details/site"? 
          <MenuList>
            <MenuItem>
              <Typography className="list-item-status" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'service')}>Service Order</Typography>
            </MenuItem>
          </MenuList>
        : <MenuList>
            <MenuItem>
              <Typography className="list-item-status" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL_STATUS, 'sales')}>Sales Order</Typography>
            </MenuItem>
            <MenuItem>
              <Typography className="list-item-status" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_APPROVAL_STATUS, 'service')}>Service Order</Typography>
            </MenuItem>
          </MenuList>
        }
      </Paper>
    )
  }

  render() {
    if(this.props.titles === "Status"){
      return (
        <div className="dropdown">
          <div className="dropdown-button" onClick={this.showDropdownMenu}>
          <div className="dropdown-selected-item">
            <div className="tracking-history">
              <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                  <img src={IconApprove} className="icon-history" alt="" /><span className="label-status">Status</span>
              </DotBadges>
            </div>
          </div>
        </div>
          { 
            this.state.displayMenu && this.renderList()  
          }
        </div>
      );
    }
    else if(this.props.titles === "Tracking History"){
      return (
        <div className="dropdown">
          <div className="dropdown-button" onClick={() => this.handleClick(Menu.PLANNING_TRACKING_HISTORY, 'tracking')}>
            <div className="dropdown-selected-item">
              <div className="tracking-history">
                <img src={IconHistory} className="icon-history" alt="" /><span className="label-history">Tracking History</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if(this.props.titles === "Input Lifetime"){
      return (
        <div className="dropdown">
          <div className="dropdown-button">
            <div className="dropdown-selected-item">
              <div className="input-lt" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS, 'lifetime') }>
                <img src={IconInputLT} className="icon-lt" alt="" /><span className="label-lt">Input Lifetime</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default FilterbyDataAction;