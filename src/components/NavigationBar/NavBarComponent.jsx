

import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { UTLogoNew, AccountPic, CmsLogo } from '../../assets/imgs';
import { MenuToggle } from '../../assets/icons';
import isAccessTokenValid from '../../core/HelpersFunction';
import './NavBarComponent.scss';
import PopUpMenu from '../PopUpMenu/PopUpMenu';
class NavBarComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			displayMenu: false,
			isShowModal: false
		};
	}

	showMenu = (event) => {
		event.preventDefault();
		this.setState({ displayMenu: true }, () => {
			document.addEventListener('click', this.hideDropdownMenu);
		});
	}

	hideMenu = async () => {
		this.setState({ displayMenu: false }, () => {
			document.removeEventListener('click', this.hideDropdownMenu);
		});
	}

	isClicked = () => {
		this.setState({ isShowModal: !this.state.isShowModal })
	}

	isClose = () => {
		this.setState({ isShowModal: !this.state.isShowModal })
	}

	renderPopUpMenu() {
		return (
			<PopUpMenu
				{...this.props}
				{...this.state}
				openModal={this.state.isShowModal}
				closemodal={this.isClose}
			/>
		)
	}

	render() {
		let navBar = null;
		if (isAccessTokenValid()) {
			if (this.props.displayMode === 'web') {
				navBar = (
					<AppBar position="fixed" className="app-bar">
						<Toolbar variant="dense" className="toolbar">
							<img src={UTLogoNew} alt="" className="logo-ut" />
							<div className="info-login">
								<p>
									{`Hi, ${this.props.userData.firstName} ${this.props.userData.lastName}`}
								</p>
								<div onClick={this.isClicked}>
									<img src={AccountPic} className="account-pic" alt="" />
									{this.renderPopUpMenu()}
								</div>
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
							<img src={CmsLogo} className="logo-dca" alt="" />
						</Toolbar>
					</AppBar>
				);
			}
		}
		return navBar;
	}
}

export default NavBarComponent;
