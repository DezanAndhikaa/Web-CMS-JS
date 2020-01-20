

import React from 'react';
// import { ExpandMore } from '@material-ui/icons';
import './FilterbyDataAction.scss';
import { Button } from '@material-ui/core';

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

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  selectItem = (item) => {
    this.props.onSelectAction(this.props.onSelectActionType, item);
  }

  renderDropdown() {
    return (
      <div className="dropdown-button" onClick={this.showDropdownMenu}>
        <div className="dropdown-selected-item">
          Data Action
          <div className="expand-icon-container"></div>
        </div>
      </div>
    );
  }

  renderDropdownList() {
    return (
      <div className="list-items">
          <Button className="button" variant="outlined" onClick={this.props.onClickPlanningApprove}>
            Planning Approved 
          </Button>
          <Button className="button-plan-del" variant="outlined" onClick={this.props.onClickPlanningDelete}>
            Planning Deleted
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

    return (
      <div className="dropdown">
        {this.renderDropdown()}
        {
          this.state.displayMenu && this.renderDropdownList()  
        }
      </div>
    );
  }
}

export default FilterbyDataAction;
