import React from 'react';
import { ExpandMore } from '@material-ui/icons';
import './DropDown.scss';



class DropDown extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        displayMenu: false,
        data: ['Planning', 'Production', 'Allocation', 'Delivery']
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
  
    // selectItem = (item,Tab,head) => {
    //   this.props.onSelectAction(this.props.onSelectActionType, item, head, this.props.salesParameter.dataFilter.PageSize);
    //   this.props.indexFilter("INDEX FILTER",Tab);
    // }
  
    handleJobType = (item) => {
      let newItem = item
      if(item === 'INS'){
        newItem = 'Periodic Inspection'
      }
      return newItem
    }
  
    renderDropdown() {
      return (
        <div className="dropdown-button-tracking" onClick={this.showDropdownMenu}>
          <div className="dropdown-selected-item-tracking">
            PLANNING
            <div className="expand-icon-container-tracking"><ExpandMore className="expand-icon-tracking" /></div>
          </div>
        </div>
      );
    }
  
    renderDropdownList() {
      return (
        <ul className="list-items-tracking">
          {this.state.data
            && this.state.data.map((item, index) => (
              item && <div className="list-item-tracking" >{this.handleJobType(item)}</div>
            ))}
        </ul>
      );
    }
  
    render() {
      if (this.props.displayMode === 'mobile') {
        return (
          <div>
            <div className="dropdown-tracking">
              {this.renderDropdown()}
            </div>
            {
              this.state.displayMenu && this.renderDropdownList()
            }
          </div>
        );
      }
  
      return (
        <div className="dropdown-tracking">
          {this.renderDropdown()}
          {
            this.state.displayMenu && this.renderDropdownList()
          }
        </div>
      );
    }
  }
  
  export default DropDown;