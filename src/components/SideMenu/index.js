

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { clickMenuAction, logoutAction } from './SideMenuComponent.actions';
import { toggleMenuAction } from 'components/NavigationBar/NavbarComponent.actions';
import { removeDataAction } from 'core/StorageHelper';
import { USER_DATA } from 'constants/index';
import SideMenuComponent from './SideMenuComponent';
import { salesParameterAction, UpdateSalesParameterAction } from 'views/planning/details/DetailPages-action';

const mapStateToProps = (state) => ({
	path: state.router.location.pathname,
	plansMenuExpanded: state.sideMenuComponentState.plansMenuExpanded,
	backlogMenuExpanded: state.sideMenuComponentState.backlogMenuExpanded,
	activeMenu: state.sideMenuComponentState.activeMenu,
	activeSubMenu: state.sideMenuComponentState.activeSubMenu,
	displayMode: state.displayMode,
	menuDrawerState: state.menuDrawerState,
	salesParameter: state.plansPageState.salesParameter,
	selectedFilters: state.plansPageState.selectedFilters,
	filterParameter: state.plansPageState.filterParameter
});

const mapDispatchToProps = (dispatch) => ({
	updateSalesParameter: (payload) =>
	  dispatch(salesParameterAction(UpdateSalesParameterAction, payload)),
	clickMenu: (menu, subMenu) => dispatch(clickMenuAction({ menu, subMenu })),
	push: (path) => dispatch(push(path)),
	closeDrawer: () => dispatch(toggleMenuAction(false)),
	logout: () => dispatch(removeDataAction(USER_DATA)),
	onLogout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuComponent);