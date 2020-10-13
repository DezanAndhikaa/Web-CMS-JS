import { Menu } from 'constants/index';
import { CLICK_MENU } from './SideMenuComponent.actions';

const initialState = {
	activeMenu: Menu.DASHBOARD,
	activeSubMenu: '',
	plansMenuExpanded: false,
	backlogMenuExpanded: false,
};

export default function clickMenuReducer(state = initialState, action) {
	if (action.type === CLICK_MENU) {
		if (action.payload.menu === Menu.PLANNING && action.payload.subMenu === '') {
			return {
				activeMenu: action.payload.menu,
				activeSubMenu: action.payload.subMenu,
				plansMenuExpanded: !state.plansMenuExpanded,
				backlogMenuExpanded: state.backlogMenuExpanded ? false:state.backlogMenuExpanded
			};
		}
		else if (action.payload.menu === Menu.BACKLOG && action.payload.subMenu === '') {
			return {
				activeMenu: action.payload.menu,
				activeSubMenu: action.payload.subMenu,
				plansMenuExpanded: state.plansMenuExpanded ? false:state.plansMenuExpanded,
				backlogMenuExpanded: !state.backlogMenuExpanded
			};
		}
		return {
			activeMenu: action.payload.menu,
			activeSubMenu: action.payload.subMenu,
			plansMenuExpanded: state.plansMenuExpanded,
			backlogMenuExpanded: state.backlogMenuExpanded
		};
	}
	return state;
}
