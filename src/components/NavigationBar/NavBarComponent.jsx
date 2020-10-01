

import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { UTLogoNew, AccountPic, CmsLogo } from 'assets/imgs';
import { MenuToggle } from 'assets/icons';
import isAccessTokenValid from 'core/HelpersFunction';
import './NavBarComponent.scss';
import PopUpMenu from 'components/PopUpMenu/PopUpMenu';
import { Menu, StorageKey } from '../../constants';
import LogoutModal from 'views/Logout/Logout';

class NavBarComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		  isShowModal: false,
		  isShowModalLogOut: false
		};
	}

	isClicked = () => {
		this.setState({isShowModal: !this.state.isShowModal})
	}

	isClose = () => {
        this.setState({isShowModal: !this.state.isShowModal})
	}

	handleClick = (menu, tab) => {
		this.props.push({
		  pathname: menu,
		  whichTab: tab
		});
	}

	isShowModalLogout = () => {
		this.setState({
			isShowModal: !this.state.isShowModal,
			isShowModalLogOut: !this.state.isShowModalLogOut
		})
	}

	isClosed=() => {
		this.setState({
			isShowModalLogOut: !this.state.isShowModalLogOut,
			isShowModal: false
		})
	}

	handleLogout = () => {
		localStorage.removeItem(StorageKey.USER_DATA);
		this.props.logout();
		this.props.onLogout();
		this.isClosed();
		this.props.push(Menu.LOGIN);
	};
	
	renderPopUpMenu() {
		return(
			<PopUpMenu 
				{...this.props}				
				{...this.state}
				openModal={this.state.isShowModal}
				closemodal={this.isClose}
				onClickMenuLogout={this.isShowModalLogout}
			/>
		)
	}

	showModalLogout(){
		return(
			<LogoutModal 
                {...this.props}
                openModal={this.state.isShowModalLogOut}
                onYesClicked={this.handleLogout}
                onNoClicked={this.isClosed}
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
							<img src={UTLogoNew} alt="" className="logo-ut"/>
							<div className="info-login">
								<p>
									{`Hi, ${this.props.userData.firstName} ${this.props.userData.lastName}`}
								</p>
								<div onClick={this.isClicked}>
									<img src={AccountPic} className="account-pic" alt="" />
									{this.renderPopUpMenu()}
								</div>
								{this.state.isShowModalLogOut && this.showModalLogout()}
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
