

import { combineReducers } from 'redux';
import { RequestLoginAction } from './LoginPage.action';
import { ApiRequestActionsStatus } from '../../core/RestClientHelpers';

const initialState = { payload: '', status: ApiRequestActionsStatus.IDLE };

function requestLoginReducer(state = initialState, action) {
	if (action.type === RequestLoginAction) {
		switch (action.status) {
		case ApiRequestActionsStatus.SUCCEEDED:
			return { payload: action.payload, status: action.status };
		case ApiRequestActionsStatus.FAILED:
			return { payload: action.error, status: action.status };
		default:
			return { payload: state.payload, status: action.status };
		}
	}
	return state;
}

const LoginPageReducers = combineReducers({
	loginRequestState: requestLoginReducer,
});

export default LoginPageReducers;
