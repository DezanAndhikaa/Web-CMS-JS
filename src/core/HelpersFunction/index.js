import decodeJwt from 'jwt-decode';
import { StorageKey } from 'constants/index';

export default function isAccessTokenValid() {
	const userDataString = localStorage.getItem(StorageKey.USER_DATA);
	if (userDataString === null) { return false; }
	const userDataObject = JSON.parse(userDataString);
	const accessToken = userDataObject.tokenResponse.accessToken || '';
	if (accessToken === '') { return false; }
	const jwt = decodeJwt(accessToken);
	const currentTime = new Date().getTime() / 1000;
	if (currentTime > jwt.exp) {
		return false;
	}
	return true;
}