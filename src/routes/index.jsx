

import React from 'react';
import { Route, Switch } from 'react-router';
import { Menu } from '../constants';
import { DetailPages } from '../views/planning/details';
import { TrackingHistory } from '../views/planning/details/components/TrackingHistory';
import { ApprovalPages } from '../views/planning/details/components/Approve';
// import { JobsPage } from '../pages/jobs-execution/jobs';
import  LoginPage  from '../views/Login/LoginPage';
// import MasterDataUploader from '../pages/master-data-uploader';
// import JobsReport from '../views/planning/details/DetailPages';
// import Settings from '../pages/settings';
// import requireAuth from '../components/AuthGuardHoc';
// import Dashboard from '../pages/dashboard/Dashboard';
// import FcMonitoring from '../pages/fc-monitoring';
// import PIDetailPage from '../pages/pi-detail';
// import ProblemLogDetail from '../pages/pi-detail/components/problemlog-detail';
// import WorkingCenter from '../pages/problemlog/working-center';
// import JobType from '../pages/problemlog/job-type';
// import JobList from '../pages/problemlog/job-list';
// import Detail from '../pages/problemlog/detail';
// import BacklogMonitoring from '../pages/backlog-monitoring';
// import BacklogMonitoringSheet from '../pages/backlog/monitoring';
// import BacklogMonitoringUnitModel from '../pages/backlog/monitoring/backlog-monitoring-unit-model';
// import BacklogMonitoringUnitCode from '../pages/backlog/monitoring/backlog-monitoring-unit-code';
// import BacklogMonitoringList from '../pages/backlog/monitoring/backlog-monitoring-list';
// import EntrySheet from '../pages/backlog/entry-sheet';

const routes = (
	<div>
		<Switch>
			<Route exact path={Menu.LOGIN} component={LoginPage} />
			<Route exact path={Menu.PLANNING_DETAILS} component={DetailPages} />
			<Route exact path={Menu.PLANNING_DETAILS_TRACKING} component={TrackingHistory} />
			<Route exact path={Menu.PLANNING_DETAILS_APPROVAL} component={ApprovalPages} />
			{/* <Route exact path={Menu.LOGIN} component={LoginPage} />
			<Route exact path={Menu.DASHBOARD} component={requireAuth(Dashboard)} />
			<Route exact path={Menu.JOBS_SUMMARY} component={requireAuth(JobsPage)} />
			<Route exact path={Menu.JOBS_REPORT} component={requireAuth(JobsReport)} /> */}
			{/* Start Add Route For BMS */}
			{/* <Route exact path={Menu.BACKLOG_MONITORING_WORKCENTER} component={BacklogMonitoringSheet}/>
			<Route exact path={Menu.BACKLOG_MONITORING_UNITMODEL} component={BacklogMonitoringUnitModel}/>
			<Route exact path={Menu.BACKLOG_MONITORING_UNITCODE} component={BacklogMonitoringUnitCode}/>
			<Route exact path={Menu.BACKLOG_MONITORING_LIST} component={BacklogMonitoringList} /> */}
			{/* End Route For BMS */}
			{/* <Route exact path={Menu.BACKLOG_ENTRYSHEET} component={requireAuth(EntrySheet)} /> */}
			{/* <Route exact path={Menu.BACKLOG} component={requireAuth(BacklogMonitoring)} /> */}
			{/* <Route exact path={Menu.FC} component={requireAuth(FcMonitoring)} />
			<Route exact path={Menu.MASTER_DATA} component={requireAuth(MasterDataUploader)} />
			<Route exact path={Menu.SETTINGS} component={requireAuth(Settings)} />
			<Route exact path={`${Menu.DETAIL_PI}:wo`} component={requireAuth(PIDetailPage)} />
			<Route exact path={Menu.DETAIL_PROBLEMLOG} component={requireAuth(ProblemLogDetail)} />
			<Route exact path={Menu.PROBLEMLOG} component={requireAuth(WorkingCenter)}/>
			<Route exact path={Menu.PROBLEMLOG_JOBTYPE} component={requireAuth(JobType)}/>
			<Route exact path={Menu.PROBLEMLOG_JOBLIST} component={requireAuth(JobList)}/>
			<Route exact path={Menu.PROBLEMLOG_DETAIL} component={requireAuth(Detail)}/>
			<Route exact path="*" component={requireAuth(Dashboard)} /> */}
		</Switch>
	</div>
);

export default routes;
