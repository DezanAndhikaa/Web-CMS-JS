import { connect } from 'react-redux';
import { PlansReducers } from '../../DetailPages-reducer';
import { push } from 'connected-react-router';
import TrackingHistory from './TrackingHistory';


const mapStateToProps = (state) => ({
	token: state.userData.tokenResponse.accessToken,
	location : state.router.location,
	displayMode: state.displayMode,
});


const mapDispatchToProps = (dispatch) => ({
	push: (path, whichTab) => dispatch(push(path, whichTab)),
});

const trackingHistory = connect(mapStateToProps, mapDispatchToProps)(TrackingHistory);
export { trackingHistory as TrackingHistory, PlansReducers };