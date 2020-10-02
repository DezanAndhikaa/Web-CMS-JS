import { StorageKey } from '../constants';

const INITIAL_DATA = {
  accessToken: null,
};

export const clientIdData = () => {
  const clientId = localStorage.getItem(process.env.REACT_APP_X_IBM_CLIENT_ID);

  if (clientId) {
    return {
      ...INITIAL_DATA,
      accessToken: JSON.parse(clientId).tokenResponse.accessToken,
    };
  }
  return { ...INITIAL_DATA };
};

export const userIdData = () => {
  const userData = localStorage.getItem(StorageKey.USER_DATA);
  const userDataObject = JSON.parse(userData);
  if (userData) {
    return {
      ...INITIAL_DATA,
      accessToken: userDataObject.tokenResponse.accessToken
    }
  }
	return { ...INITIAL_DATA };
};

export const userData = () => {
  const user = localStorage.getItem('userData');

  if (user) {
    return {
      accessToken: JSON.parse(user).tokenResponse.accessToken,
    };
  }
  return {
    accessToken: null,
  };
};