import { connect } from 'react-redux';
import { PlansReducers } from '../../DetailPages-reducer';
import { push } from 'connected-react-router';
import SapIssuePages from './SapIssuePages';

const mapStateToProps = (state) => ({
	token: state.userData.tokenResponse.accessToken,
	location : state.router.location,
	displayMode: state.displayMode,
});

const mapDispatchToProps = (dispatch) => ({
	push: (path, whichTab) => dispatch(push(path, whichTab)),
});

const sapIssuepages = connect(mapStateToProps, mapDispatchToProps)(SapIssuePages);
export { sapIssuepages as SapIssuePages, PlansReducers };