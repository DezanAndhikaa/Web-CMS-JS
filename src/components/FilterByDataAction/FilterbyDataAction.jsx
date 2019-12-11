

import React from 'react';
// import { ExpandMore } from '@material-ui/icons';
import './FilterbyDataAction.scss';
// import { FolderIcon } from '../../assets/icons/index'

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

  handleJobType = (item) => {
    let newItem = item
    if(item === 'INS'){
      newItem = 'Periodic Inspection'
    }
    return newItem
  }

  renderDropdown() {
    return (
      <div className="dropdown-button" onClick={this.showDropdownMenu}>
        <div className="dropdown-selected-item">
          {this.props.selected}
          <div className="expand-icon-container"></div>
        </div>
      </div>
    );
  }

  renderDropdownList() {
    return (
      <ul className="list-items">
        {/* {this.props.data
          && this.props.data.map((item, index) => (
            item && <div className="list-item" onClick={() => this.selectItem(item)} key={index}>{this.handleJobType(item)}</div>
          ))} */}
      </ul>
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
