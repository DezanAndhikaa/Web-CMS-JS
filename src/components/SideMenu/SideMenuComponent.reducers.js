import { Menu } from '../../constants/index';
import { CLICK_MENU } from './SideMenuComponent.actions';

const initialState = {
	activeMenu: Menu.DASHBOARD,
	activeSubMenu: '',
	jobsMenuExpanded: false,
	backlogMenuExpanded: false,
};

export default function clickMenuReducer(state = initialState, action) {
	if (action.type === CLICK_MENU) {
		if (action.payload.menu === Menu.JOBS && action.payload.subMenu === '') {
			return {
				activeMenu: action.payload.menu,
				activeSubMenu: action.payload.subMenu,
				jobsMenuExpanded: !state.jobsMenuExpanded,
				backlogMenuExpanded: state.backlogMenuExpanded ? false:state.backlogMenuExpanded
			};
		}
		else if (action.payload.menu === Menu.BACKLOG && action.payload.subMenu === '') {
			return {
				activeMenu: action.payload.menu,
				activeSubMenu: action.payload.subMenu,
				jobsMenuExpanded: state.jobsMenuExpanded ? false:state.jobsMenuExpanded,
				backlogMenuExpanded: !state.backlogMenuExpanded
			};
		}
		return {
			activeMenu: action.payload.menu,
			activeSubMenu: action.payload.subMenu,
			jobsMenuExpanded: state.jobsMenuExpanded,
			backlogMenuExpanded: state.backlogMenuExpanded
		};
	}
	return state;
}
