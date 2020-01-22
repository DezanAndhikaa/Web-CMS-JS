

import React from 'react';
import { AppBar, Toolbar, Badge } from '@material-ui/core';
import { UTLogoNew, AccountPic, DcaLogo } from '../../assets/imgs';
import { MenuToggle, IconNotif, IconHistory } from '../../assets/icons';
import isAccessTokenValid from '../../core/HelpersFunction';
import './NavBarComponent.scss';
import { withStyles } from '@material-ui/core/styles';

const Badges = withStyles(theme => ({
	badge: {
		left: -5,
		fontSize: '10px',
		border: '2px solid white'
	},
  }))(Badge);

class NavBarComponent extends React.Component {
	render() {
		let navBar = null;
		if (isAccessTokenValid()) {
			if (this.props.displayMode === 'web') {
				navBar = (
					<AppBar position="fixed" className="app-bar">
						<Toolbar variant="dense" className="toolbar">
							<img src={UTLogoNew} alt="" className="logo-ut"/>
							<div className="info-login">
								<p>
									{`Hi, ${this.props.userData.firstName} ${this.props.userData.lastName}`}
								</p>
								<img src={AccountPic} className="account-pic" alt="" />
							</div>
						</Toolbar>
					</AppBar>
				);
			} else {
				navBar = (
					<AppBar position="fixed" className="app-bar-tab">
						<div onClick={() => this.props.toggleMenu(!this.props.menuDrawerState)}>
							<img src={MenuToggle} alt="menu" className="menu-toggle" />
						</div>
						<Toolbar variant="dense" className="toolbar">
							<img src={DcaLogo} className="logo-dca" alt="" />
						</Toolbar>
					</AppBar>
				);
			}
		}
		return navBar;
	}
}

export default NavBarComponent;
