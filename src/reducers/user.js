import { 
  GET_USER_TYPE,
  LOGIN_TYPE,
  LOGOUT_TYPE,
  SUCCESS_TYPE,
  FAILURE_TYPE,
} from '../actions/actionTypes';

const initialState = {
  isUser: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN_TYPE}${SUCCESS_TYPE}`:
    case `${GET_USER_TYPE}${SUCCESS_TYPE}`:
      return { ...state, ...action.payload.data };
    case `${LOGOUT_TYPE}${SUCCESS_TYPE}`:
      return { ...initialState };
    case `${LOGIN_TYPE}${FAILURE_TYPE}`:
      return {...state,...action.payload}
    default:
      return state;
  }
};
