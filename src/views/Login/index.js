import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { requestLoginAction } from './LoginPage.action';
import { storeDataAction } from 'core/StorageHelper';
import { USER_DATA, StorageKey } from 'constants/index';
import LoginPageReducers from './LoginPage.reducer';
import LoginPage from './LoginPage';

const mapStateToProps = (state) => ({
	displayMode: state.displayMode,
	loginRequest: state.loginPageState.loginRequestState,
	userData: state.userData,
});

const mapDispatchToProps = (dispatch) => ({
	login: (username, password) => dispatch(requestLoginAction(username, password)),
	push: (url) => dispatch(push(url)),
	saveUserData: (userData) => dispatch(storeDataAction(USER_DATA, StorageKey.USER_DATA, userData)),
});

const loginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export { loginPage as LoginPage, LoginPageReducers };