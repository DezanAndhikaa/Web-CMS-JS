import { connect } from 'react-redux';
import { AppReducer } from './App.reducers';
import { getDataAction } from '../core/StorageHelper';
import { USER_DATA, StorageKey } from '../constants';
import { setPageDisplayModeAction } from '../core/PageHelpers/Page.actions';
import setTimezoneAction from '../core/TimezoneHelpers/Timezone.actions';
import App from './App';

const mapDispatchToProps = (dispatch) => ({
	getUserData: () => dispatch(getDataAction(USER_DATA, StorageKey.USER_DATA)),
	setDisplayMode: (mode) => dispatch(setPageDisplayModeAction(mode)),
	setTimezone: (timezone) => dispatch(setTimezoneAction(timezone)),
});

const app = connect(null, mapDispatchToProps)(App);
export { app as App, AppReducer };
