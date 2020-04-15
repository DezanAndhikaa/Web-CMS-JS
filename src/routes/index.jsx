

import React from 'react';
import { Route, Switch } from 'react-router';
import { Menu } from '../constants';
import { DetailPages } from '../views/planning/details';
import { DetailPagesSite } from '../views/planning/details/DetailPagesSite';
import { Status } from '../views/planning/details/components/Status';
import { TrackingHistory } from '../views/planning/details/components/TrackingHistory';
import { ApprovalPages } from '../views/planning/details/components/Approve';
import { Notification } from '../views/planning/details/components/Notification';
import  { LoginPage }  from '../views/Login';
import requireAuth from '../components/AuthGuardHoc';
import Dashboard from '../views/Dashboard/';

const routes = (
	<div>
		<Switch>
			<Route exact path={Menu.LOGIN} component={LoginPage} />
			<Route exact path={Menu.PLANNING_DETAILS} component={requireAuth(DetailPages)} />
			<Route exact path={Menu.PLANNING_DETAILS_SITE} component={requireAuth(DetailPagesSite)} />
			<Route exact path={Menu.PLANNING_DETAILS_STATUS} component={requireAuth(Status)} />
			<Route exact path={Menu.PLANNING_TRACKING_HISTORY} component={requireAuth(TrackingHistory)} />
			<Route exact path={Menu.PLANNING_APPROVAL} component={requireAuth(ApprovalPages)} />
			<Route exact path={Menu.PLANNING_ALL_NOTIF} component={requireAuth(Notification)} />
			<Route exact path="*" component={requireAuth(Dashboard)} />
		</Switch>
	</div>
);

export default routes;
