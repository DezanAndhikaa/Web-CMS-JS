import { StorageKey } from '../constants';

const INITIAL_DATA = {
  // You can put here data from localStorage like name, profile etc
  accessToken: null,
};

// For get data information from PCAR Login
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

// For get data information from Portal Login
export const userData = () => {
  const user = localStorage.getItem('userData');

  if (user) {
    return {
      // You can put here data from localStorage like name, profile etc
      accessToken: JSON.parse(user).tokenResponse.accessToken,
    };
  }
  return {
    accessToken: null,
  };
};
