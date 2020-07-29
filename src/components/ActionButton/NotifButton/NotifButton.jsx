import React from 'react';
import './NotifButton.scss';
import {Badge, Paper } from '@material-ui/core/';
import { IconNotif } from '../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import CardData from '../../../views/planning/details/components/Notification/Components/Card';

const DotBadges = withStyles(theme => ({
	badge: {
    top: -1,
    border: '2px solid white',
    width: 'auto',
    minWidth: '15px',
    height: '15px',
    borderRadius: '50%'
	},
}))(Badge);

class NotifButton extends React.PureComponent {

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
  }

  renderList(){
    return(
      <Paper classes={{root: this.props.idNotif === "Status" ? "list-under-dev-status" : "list-under-dev" }}>
        <CardData 
          {...this.props}
          idCard = "UnderDev"
        />
      </Paper>
    )
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

    return(
      <div className="dropdown-notif">
        <div className="dropdown-button-notif" onClick={this.showDropdownMenu}>
          <div className="notif-selected-item">
            <div className="notif-history">
                <DotBadges color="secondary" badgeContent="" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                  <img src={IconNotif} className="icon-notif" alt="" /> <span className="label-notif">Notification</span>
                </DotBadges>
            </div>
          </div>
        </div>
        {
          this.state.displayMenu && this.renderList()  
        }
      </div>
    ) 
	}
}

export default withRouter(NotifButton);