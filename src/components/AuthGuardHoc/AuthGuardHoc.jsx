import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Menu } from '../../constants';
import isAccessTokenValid from '../../core/HelpersFunction';

export default function (ComposedComponent) {
	class AuthGuardHoc extends Component {
		componentWillMount() {
			if (!isAccessTokenValid()) this.props.goToLogin();
		}

		componentWillUpdate() {
			if (!isAccessTokenValid()) this.props.goToLogin();
		}

		render() {
			return <ComposedComponent {...this.props.component} />;
		}
	}

	const mapDispatchToProps = (dispatch) => ({
		goToLogin: () => dispatch(push(Menu.LOGIN)),
	});

	return connect(null, mapDispatchToProps)(AuthGuardHoc);
}
