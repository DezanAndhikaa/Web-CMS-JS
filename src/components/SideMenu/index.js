

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { clickMenuAction, logoutAction } from './SideMenuComponent.actions';
import { toggleMenuAction } from '../NavigationBar/NavbarComponent.actions';
import { removeDataAction } from '../../core/StorageHelper';
import { USER_DATA } from '../../constants';
import SideMenuComponent from './SideMenuComponent';

const mapStateToProps = (state) => ({
	path: state.router.location.pathname,
	jobsMenuExpanded: state.sideMenuComponentState.jobsMenuExpanded,
	backlogMenuExpanded: state.sideMenuComponentState.backlogMenuExpanded,
	activeMenu: state.sideMenuComponentState.activeMenu,
	activeSubMenu: state.sideMenuComponentState.activeSubMenu,
	displayMode: state.displayMode,
	menuDrawerState: state.menuDrawerState,
});

const mapDispatchToProps = (dispatch) => ({
	clickMenu: (menu, subMenu) => dispatch(clickMenuAction({ menu, subMenu })),
	push: (path) => dispatch(push(path)),
	closeDrawer: () => dispatch(toggleMenuAction(false)),
	logout: () => dispatch(removeDataAction(USER_DATA)),
	onLogout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuComponent);
