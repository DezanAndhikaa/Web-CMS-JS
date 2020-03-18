

import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { UTLogoNew, AccountPic, DcaLogo } from '../../assets/imgs';
import { MenuToggle } from '../../assets/icons';
import isAccessTokenValid from '../../core/HelpersFunction';
import './NavBarComponent.scss';
import PopUpMenu from '../PopUpMenu/PopUpMenu';
class NavBarComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		  displayMenu: false,
		};
	}
	
	showMenu = (event) => {
		event.preventDefault();
		this.setState({ displayMenu: true }, () => {
			document.addEventListener('click', this.hideDropdownMenu);
		});
	}

	hideMenu = async() => {
		this.setState({ displayMenu: false }, () => {
		  document.removeEventListener('click', this.hideDropdownMenu);
		});
	}

	renderPopUpMenu() {
		return(
			<PopUpMenu />
		)
	}

	render() {
		let navBar = null;
		if (isAccessTokenValid()) {
			if (this.props.displayMode === 'web') {
				navBar = (
					<AppBar position="fixed" className="app-bar">
						<Toolbar variant="dense" className="toolbar">
							<img src={UTLogoNew} alt="" className="logo-ut"/>
							<div className="info-login" onClick={this.showMenu}>
								<p>
									{`Hi, ${this.props.userData.firstName} ${this.props.userData.lastName}`}
								</p>
								<img src={AccountPic} className="account-pic" alt="" />
							</div>
						</Toolbar>
						{ 
							this.state.displayMenu && this.renderPopUpMenu()  
						}
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
