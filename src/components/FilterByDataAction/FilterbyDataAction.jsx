

import React from 'react';
// import { ExpandMore } from '@material-ui/icons';
import './FilterbyDataAction.scss';
import { Button, Badge } from '@material-ui/core';
import { IconApprove, IconHistory } from '../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
import { Menu } from '../../constants';

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
    this.props.history.push({
      pathname: menu,
      whichTab: tab
    });
  }

  renderDropdownList() {
    return (
      <div className="list-items">
          <Button className="button" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_TRACKING, 'sales') }>
            Sales Order
          </Button>
          <Button className="button-plan-del" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_TRACKING, 'service') }>
            Service Order
          </Button>
      </div>
    );
  }

  renderDropdownApproval() {
    return (
      <div className="list-items">
          <Button className="button" variant="outlined" onClick={ () => this.handleClick(Menu.PLANNING_DETAILS_APPROVAL, 'sales') }>
            Sales Orders
          </Button>
          <Button className="button-plan-del" variant="outlined" onClick={() => this.handleClick(Menu.PLANNING_DETAILS_APPROVAL, 'service') }>
            Service Order
          </Button>
      </div>
    );
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

    if(this.props.titles === "Status"){
      return (
        <div className="dropdown">
          <div className="dropdown-button" onClick={this.showDropdownMenu}>
          <div className="dropdown-selected-item">
            <div className="tracking-history">
              <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                  <img src={IconHistory} className="icon-history" alt="" /><span className="label-history">Status</span>
              </DotBadges>
            </div>
          </div>
        </div>
          {
            this.state.displayMenu && this.renderDropdownList()  
          }
        </div>
      );
    }else if(this.props.titles === "Approve"){
      return (
        <div className="dropdown">
          <div className="dropdown-button" onClick={this.showDropdownMenu}>
            <div className="dropdown-selected-item">
              <div className="tracking-history">
                <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                    <img src={IconApprove} className="icon-history" alt="" /><span className="label-history">Approve</span>
                </DotBadges>
              </div>
          </div>
        </div>
          {
            this.state.displayMenu && this.renderDropdownApproval()  
          }
        </div>
      );
    }else{
      return (
        <div className="dropdown">
          <div className="dropdown-button" onClick={this.showDropdownMenu}>
          <div className="dropdown-selected-item">
            <div className="tracking-history">
              <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                  <img src={IconHistory} className="icon-history" alt="" /><span className="label-history">Tracking History</span>
              </DotBadges>
            </div>
          </div>
        </div>
          {
            this.state.displayMenu && this.renderDropdownList()  
          }
        </div>
      );
    }
  }
}

export default FilterbyDataAction;
