import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from 'configure-store';
import { LoginPageReducers } from 'views/Login';
import { PlansReducers } from 'views/planning/details/DetailPages-reducer';
import { STORAGE_ACTIONS } from 'core/StorageHelper';
import { USER_DATA, PLAN_DATA } from '../constants';
import { LOGOUT_ACTION } from 'components/SideMenu/SideMenuComponent.actions';
import setTimezoneReducer from 'core/TimezoneHelpers/Timezone.reducers';
import clickMenuReducer from 'components/SideMenu/SideMenuComponent.reducers';
import setPageDisplayModeReducer from 'core/PageHelpers';
import toggleMenuReducer from 'components/NavigationBar/NavbarComponent.reducers';

const initialState = { tokenResponse: {} };

function userDataReducer(state = initialState, action) {
	if (action.type === STORAGE_ACTIONS.REMOVE_DATA + USER_DATA) {
		return { tokenResponse: {} };
	}
	if (action.data && ((action.type === STORAGE_ACTIONS.GET_DATA + USER_DATA)
    || action.type === STORAGE_ACTIONS.STORE_DATA + USER_DATA)) {
		return action.data;
	}
	return state;
}

function selectedPlanDataReducer(state = {}, action) {
	if (action.data && ((action.type === STORAGE_ACTIONS.GET_DATA + PLAN_DATA)
    || action.type === STORAGE_ACTIONS.STORE_DATA + PLAN_DATA)) {
		return action.data;
	}
	return state;
}

function lastActionReducer(state = '', action) {
	if (action.type) {
		return action.type;
	}
	return state;
}

const AppReducer = combineReducers({
	router: connectRouter(history),
	lastAction: lastActionReducer,
	userData: userDataReducer,
	sideMenuComponentState: clickMenuReducer,
	loginPageState: LoginPageReducers,
	plansPageState: PlansReducers,
	displayMode: setPageDisplayModeReducer,
	timezone: setTimezoneReducer,
	menuDrawerState: toggleMenuReducer,
	selectedPlanData: selectedPlanDataReducer,
});

const RootReducer = (state, action) => {
	if (action.type === LOGOUT_ACTION) { state = undefined; }
	return AppReducer(state, action);
};

export { AppReducer, RootReducer as AppState };
