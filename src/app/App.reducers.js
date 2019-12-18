import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../configure-store';
// import { LoginPageReducers } from '../pages/login';
import { PlansReducers } from '../views/planning/details/DetailPages-reducer';
import { STORAGE_ACTIONS } from '../core/StorageHelper';
import { USER_DATA, PLAN_DATA } from '../constants';
// import { PIDetailReducers } from '../pages/pi-detail/PiDetailPage.reducers';
// import { ReportReducers } from '../pages/jobs-execution/jobs-report/JobsReport.reducer';
import { LOGOUT_ACTION } from '../components/SideMenu/SideMenuComponent.actions';
import setTimezoneReducer from '../core/TimezoneHelpers/Timezone.reducers';
import clickMenuReducer from '../components/SideMenu/SideMenuComponent.reducers';
import setPageDisplayModeReducer from '../core/PageHelpers';
import toggleMenuReducer from '../components/NavigationBar/NavbarComponent.reducers';
// import problemLogReducer from '../pages/pi-detail/components/problem-log-list/ProblemLog.reducer';
// import fetchDetailReducer from '../pages/pi-detail/components/problemlog-detail/ProblemLogDetail.reducer';
// import plDataReducers from '../pages/problemlog/working-center/WorkingCenter.reducer';
// import plJobTypeReducers from '../pages/problemlog/job-type/JobType.reducer';
// import plJobListReducers from '../pages/problemlog/job-list/JobList.reducer';
// import plDetailReducers from '../pages/problemlog/detail/Detail.reducer';
// import BmsReducers from '../pages/backlog/monitoring/backlog-monitoring-workcenter/BacklogMonitoringWorkCenter.reducer';
// import UnitModelReducers from '../pages/backlog/monitoring/backlog-monitoring-unit-model/BacklogMonitoringUnitModel.reducer';
// import UnitCodeReducers from '../pages/backlog/monitoring/backlog-monitoring-unit-code/BacklogMonitoringUnitCode.reducer';
// import BmsListReducers from '../pages/backlog/monitoring/backlog-monitoring-list/BacklogMonitoringList.reducer';
// import CustomTableReducers from '../pages/backlog/monitoring/components/Custom Table/CustomTable.reducer';
// import blEntrySheetReducers from '../pages/backlog/entry-sheet/EntrySheet.reducer';


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
	// loginPageState: LoginPageReducers,
	plansPageState: PlansReducers,
	displayMode: setPageDisplayModeReducer,
	timezone: setTimezoneReducer,
	menuDrawerState: toggleMenuReducer,
	// piPageState: PIDetailReducers,
	// reportState: ReportReducers,
	selectedPlanData: selectedPlanDataReducer,
	//ProblemLog Approval
	// piDetailState: problemLogReducer,
	// problemLogDetail: fetchDetailReducer,
	//ProblemLog Monitoring
	// plWorkCenter: plDataReducers,
	// plJobType: plJobTypeReducers,
	// plJobList: plJobListReducers,
	// plDetail: plDetailReducers,
	// BmsReducers,
	// UnitModelReducers,
	// UnitCodeReducers,
	// CustomTableReducers,
	// BmsListReducers,
	// blEntrySheet: blEntrySheetReducers,
});

const RootReducer = (state, action) => {
	if (action.type === LOGOUT_ACTION) { state = undefined; } // eslint-disable-line no-param-reassign
	return AppReducer(state, action);
};

export { AppReducer, RootReducer as AppState };
