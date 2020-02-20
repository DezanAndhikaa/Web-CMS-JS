import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import NotifButton from './NotifButton';

const mapDispatchToProps = (dispatch) => ({
	push : (path) => dispatch(push(path)),
});

const notifbtn = connect(mapDispatchToProps)(NotifButton);

export { notifbtn as NotifButton };