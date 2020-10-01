import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PopUpMenu from './PopUpMenu';
import { removeDataAction } from 'core/StorageHelper';
import { USER_DATA } from '../../constants';
import { logoutAction } from 'actions/Planning';

const mapStateToProps = (state) => ({
	path: state.router.location.pathname,
});

const mapDispatchToProps = (dispatch) => ({
	push : (path) => dispatch(push(path)),
	logout: () => dispatch(removeDataAction(USER_DATA)),
	onLogout: () => dispatch(logoutAction()),
});

const userProfile = connect(mapStateToProps, mapDispatchToProps)(PopUpMenu);

export { userProfile as PopUpMenu };