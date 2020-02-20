import { ApiUrlBase, RequestMethod } from '../../constants';
import { callApi } from '../../core/RestClientHelpers';


export const RequestLoginAction = 'REQUEST_LOGIN';

export function requestLoginAction(username, password) {
	console.log('aaku adalah username : ', username);
	console.log('aaku adalah password : ', password);
	const body = JSON.stringify({
		username,
		password,
	});

	const requestConfig = {
		method: RequestMethod.POST,
		url: ApiUrlBase.AUTH_API_URL,
		data: body,
		headers: {
			'Content-Type': 'application/json',
			'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
		},
	};


	return async (dispatch) => dispatch(callApi(RequestLoginAction, requestConfig));
}
