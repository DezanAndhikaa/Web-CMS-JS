

import React from 'react';
// import { ExpandMore } from '@material-ui/icons';
import './FilterbyDataAction.scss';
import { Button, Badge } from '@material-ui/core';
import { IconApprove, IconHistory, IconInputLT } from '../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
import { Menu } from '../../constants';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

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
      <Paper className="list-items-fbdt">
      <MenuList>
        <MenuItem>
          <Typography className="list-item-fbdt" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'sales')}>Sales Order</Typography>
        </MenuItem>
        <MenuItem>
          <Typography className="list-item-fbdt" variant="inherit" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'service')}>Service Order</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
    )
  }

  // renderDropdownList() {
  //   return (
  //     <div className="list-items-fbdt">
  //         <Button className="button" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'sales') }>
  //           Sales Order
  //         </Button>
  //         <Button className="button-plan-del" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_STATUS, 'service') }>
  //           Service Order
  //         </Button>
  //     </div>
  //   );
  // }

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

    if(this.props.titles === "Status"){
      return (
        <div className="dropdown">
          <div className="dropdown-button" onClick={this.showDropdownMenu}>
          <div className="dropdown-selected-item">
            <div className="tracking-history">
              <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                  <img src={IconApprove} className="icon-history" alt="" /><span className="label-history">Status</span>
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
          <div className="dropdown-button" onClick={this.showDropdownMenu}>
            <div className="dropdown-selected-item">
              <div className="tracking-history">
                {/* <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}> */}
                    <img src={IconHistory} className="icon-history" alt="" /><span className="label-history">Tracking History</span>
                {/* </DotBadges> */}
              </div>
          </div>
        </div>
          {
            // this.state.displayMenu && this.renderDropdownApproval()  
          }
        </div>
      );
    }
    else if(this.props.titles === "Input Lifetime"){
      return (
        <div className="dropdown">
          <div className="dropdown-button">
            <div className="dropdown-selected-item">
              <div className="input-lt" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS) }>
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
