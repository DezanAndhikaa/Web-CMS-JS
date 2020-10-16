export const RequestMethod = {
	POST: 'POST',
	GET: 'GET',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

export const Menu = {
	LOGIN: '/webcms',
	PLANNING : '/webcms/planning',
	PLANNING_INPUT_LIFETIME : '/webcms/planning/input-lifetime',
	PLANNING_SITE : '/webcms/planning/site',
	PLANNING_HO_STATUS: '/webcms/planning/ho/status',
	PLANNING_SITE_STATUS: '/webcms/planning/site/status',
	PLANNING_HO: '/webcms/planning/ho',
	PLANNING_TRACKING_HISTORY:'/webcms/planning/tracking-history',
	PLANNING_DASHBOARD : '/webcms/planning/dashboard',
	PLANNING_ALL_NOTIF : '/webcms/planning/all-notification',
	PLANNING_HO_SAP: '/webcmsjs/planning/ho/sap-issue',
	DASHBOARD: '/webcms/dashboard',
	ALLOCATION: '/webcmsjs/allocation',
	SETTINGS: '/websmsjs/settings',
	LOGOUT: '/websmsjs/logout',
	TRACKING: '/webcms/tracking',
	PRODUCTION: '/webcms/production',
	DELIVERY: '/webcms/delivery',
	EXECUTION: '/webcms/execution'
};

export const USER_DATA = 'USER_DATA';
export const PLAN_DATA = 'SELECTED_PLAN_DATA';
export const USER_LOGOUT = 'USER_LOGOUT';
export const REQUEST_TIME_OUT = 50000;

export const StorageKey = {
	USER_DATA: 'USER_DATA_STORAGE_KEY',
	PLAN_DATA: 'PLAN_DATA_STORAGE_KEY',
};

export const BasePathDev = '.';
export const BasePathProv = '../..';
export const BasePathSec = '..';

export const BasePath = BasePathDev;