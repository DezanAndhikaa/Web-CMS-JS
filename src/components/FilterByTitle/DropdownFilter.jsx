

import React from 'react';
import { ExpandMore } from '@material-ui/icons';
import './DropdownFilter.scss';

class DropdownFilter extends React.Component {
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

  selectItem = (item,Tab) => {
    this.props.onSelectAction(this.props.onSelectActionType, item);
    console.log("nilai si Tab ", Tab)
    this.props.indexFilter("INDEX FILTER",Tab);
  }

  handleJobType = (item) => {
    let newItem = item
    if(item === 'INS'){
      newItem = 'Periodic Inspection'
    }
    return newItem
  }

  renderDropdown() {
    return (
      <div className="dropdown-filter-button" onClick={this.showDropdownMenu}>
        <div className="dropdown-selected-items">
          {this.props.selected}
          <div className="expand-icon-containers"><ExpandMore className="expand-icons" /></div>
        </div>
      </div>
    );
  }

  renderDropdownList() {
    return (
      <ul className="list-items-filter">
        {this.props.data
          && this.props.data.map((item, index) => (
            item && <div className="list-item-filter" onClick={() => this.selectItem(item,this.props.indexTab)} key={index}>{this.handleJobType(item)}</div>
          ))}
      </ul>
    );
  }

  render() {
    if (this.props.displayMode === 'mobile') {
      return (
        <div>
          <div className="dropdown-filter">
            {this.renderDropdown()}
          </div>
          {
            this.state.displayMenu && this.renderDropdownList()
          }
        </div>
      );
    }

    return (
      <div className="dropdown-filter">
        {this.renderDropdown()}
        {
          this.state.displayMenu && this.renderDropdownList()
        }
      </div>
    );
  }
}

export default DropdownFilter;