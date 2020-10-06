import axios from 'axios';

export const ApiRequestActionsStatus = {
	IDLE: 'IDLE',
	LOADING: 'LOADING',
	SUCCEEDED: 'SUCCEEDED',
	FAILED: 'FAILED',
};

function startedApiRequestAction(type) {
	return {
		type,
		status: ApiRequestActionsStatus.LOADING,
	};
}

function succeededApiRequestAction(type, payload) {
	return {
		type,
		status: ApiRequestActionsStatus.SUCCEEDED,
		payload,
	};
}

function failedApiRequestAction(type, error, payload = undefined) {
	return {
		type,
		status: ApiRequestActionsStatus.FAILED,
		payload,
		error,
	};
}

export function callApi(type, requestConfig) {
	return async (dispatch) => {
		dispatch(startedApiRequestAction(type));
		try {
			const payload = await axios(requestConfig);
			dispatch(succeededApiRequestAction(type, payload.data));
		} catch (error) {
			dispatch(failedApiRequestAction(type, error));
		}
	};
}

export const ApiRequestActionType = {
	FETCH: 'FETCH_',
	POST: 'POST_',
	SYNC: 'SYNC_DATA',
};