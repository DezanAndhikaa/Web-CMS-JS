import React from 'react';
import './NotifButton.scss';
import {Badge, Paper } from '@material-ui/core/';
import { IconNotif } from '../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
import { Menu } from '../../../constants';
import { withRouter } from "react-router-dom";
import CardData from '../../../views/planning/details/components/Notification/Components/Card';

const Badges = withStyles(theme => ({
	badge: {
		top: -3,
		left: -5,
		fontSize: '10px',
		border: '2px solid white'
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
      <Paper classes={{root: this.props.idNotif === "Status" ? "list-notif-status" : 
      this.props.idNotif === "DetailSite" ? "list-notif-site" : "list-notif" }}>
        <div className="list-container">
          <div className="list-item-notif">
            <div className="listnya">
            <CardData 
              {...this.props}
              idCard = "Notification"
            />
            </div>
          </div>
        </div>
        <div className="see-all-notif">
          <div className="label-notif" onClick={ () => this.handleClick(Menu.PLANNING_ALL_NOTIF) }>See All Notification</div>
        </div>
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
                <Badges badgeContent={57} color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                    <img src={IconNotif} className="icon-notif" alt="" /> <span className="label-notif">Notification</span>
                </Badges>
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