import { RequestMethod } from '../../constants';
import { callApi } from '../../core/RestClientHelpers';

export const RequestLoginAction = 'REQUEST_LOGIN';

export function requestLoginAction(username, password) {
	const body = JSON.stringify({
		username,
		password,
	});

	const requestConfig = {
		method: RequestMethod.POST,
		url: `${process.env.REACT_APP_API_URL}/cms/api/login`,
		data: body,
		headers: {
			'Content-Type': 'application/json',
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
		},
	};

	return async (dispatch) => dispatch(callApi(RequestLoginAction, requestConfig));
}
