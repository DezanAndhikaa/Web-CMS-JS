export const RequestMethod = {
	POST: 'POST',
	GET: 'GET',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

export const Menu = {
	LOGIN: '/webcms/',
	PLANNING: '/webcms/planning',
	PLANNING_DETAILS: '/webcms/planning/details',
	PLANNING_DETAILS_SITE: '/webcms/planning/details/site',
	PLANNING_DETAILS_STATUS: '/webcms/planning/approval/status',
	PLANNING_APPROVAL: '/webcms/planning/approval',
	PLANNING_TRACKING_HISTORY: '/webcms/planning/tracking-history',
	PLANNING_DASHBOARD: '/webcms/planning/dashboard',
	PLANNING_ALL_NOTIF: '/webcms/planning/all-notification',
	PLANNING_SAP: '/webcmsjs/planning/approval/sap-issue',
	DASHBOARD: '/webcms/dashboard',
	ALLOCATION: '/webcmsjs/allocation',
	SETTINGS: '/websmsjs/settings',
	LOGOUT: '/websmsjs/logout',
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