

import { connect } from 'react-redux';
import NavBarComponent from './NavBarComponent';
import { toggleMenuAction } from './NavbarComponent.actions';
import { push } from 'connected-react-router';

const mapStateToProps = (state) => ({
	path: state.router.location.pathname,
	userData: state.userData,
	displayMode: state.displayMode,
	menuDrawerState: state.menuDrawerState,
});

const mapDispatchToProps = (dispatch) => ({
	toggleMenu: (isOpen) => dispatch(toggleMenuAction(isOpen)),
	push : (path) => dispatch(push(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
