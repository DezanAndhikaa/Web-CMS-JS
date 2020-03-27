import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import ActionButton from './ActionButton';

const mapDispatchToProps = (dispatch) => ({
	push : (path) => dispatch(push(path)),
});

const actbtn = connect(mapDispatchToProps)(ActionButton);

export { actbtn as ActionButton };