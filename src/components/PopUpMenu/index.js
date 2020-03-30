import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PopUpMenu from './PopUpMenu';

const mapDispatchToProps = (dispatch) => ({
	push : (path) => dispatch(push(path)),
});

const userProfile = connect(mapDispatchToProps)(PopUpMenu);

export { userProfile as PopUpMenu };