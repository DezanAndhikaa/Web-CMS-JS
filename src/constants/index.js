export const RequestMethod = {
	POST: 'POST',
	GET: 'GET',
	PUT: 'PUT',
	DELETE: 'DELETE',
};
  
export const Menu = {
	PLANNING : '/webcms/planning',
	PLANNING_DETAILS : '/webcms/planning/details',
	PLANNING_DASHBOARD : '/webcms/planning/dashboard',
	LOGIN: '/webdcajs/',
	DASHBOARD: '/webdcajs/dashboard',
	ALLOCATION: '/webdcajs/allocation',
	JOBS: '/webdcajs/jobs',
	JOBS_SUMMARY: '/webdcajs/jobs/summary',
	JOBS_REPORT: '/webdcajs/jobs/report',
	DETAIL_PI: '/webdcajs/jobs/summary/detailpi',
	BACKLOG: '/webdcajs/backlog',
	BACKLOG_MONITORING_WORKCENTER : '/webdcajs/backlog/monitoring',
	BACKLOG_MONITORING_UNITMODEL : '/webdcajs/backlog/unitmodel',
	BACKLOG_MONITORING_UNITCODE : '/webdcajs/backlog/unitmodel/unitcode',
	BACKLOG_MONITORING_LIST : '/webdcajs/backlog/unitmodel/unitcode/list',
	BACKLOG_ENTRYSHEET : '/webdcajs/backlog/entry-sheet',
	FC: '/webdcajs/fc',
	MASTER_DATA: '/webdcajs/masterdata',
	SETTINGS: '/webdcajs/settings',
	LOGOUT: '/webdcajs/logout',
	DETAIL_PROBLEMLOG : '/webdcajs/jobs/summary/detailpi/detailproblemlog',
	PROBLEMLOG : '/webdcajs/problemlog',
	PROBLEMLOG_JOBTYPE : '/webdcajs/problemlog/:workcenter',
	PROBLEMLOG_JOBLIST : '/webdcajs/problemlog/:workcenter/:jobtype',
	PROBLEMLOG_DETAIL : '/webdcajs/problemlog-detail/:idDetail',
};
  
export const USER_DATA = 'USER_DATA';
export const JOB_DATA = 'SELECTED_JOB_DATA';
export const USER_LOGOUT = 'USER_LOGOUT';
export const REQUEST_TIME_OUT = 50000;
  
export const StorageKey = {
	USER_DATA: 'USER_DATA_STORAGE_KEY',
	JOB_DATA: 'JOB_DATA_STORAGE_KEY',
};
  
export const ApiUrlBase = {
	AUTH_API_URL: process.env.REACT_APP_AUTH_API_URL,
	WORK_ORDER_API_URL: process.env.REACT_APP_WORK_ORDER_API_URL,
	TRACKING_API_URL: process.env.REACT_APP_TRACKING_API_URL,
	PI_API_URL: process.env.REACT_APP_PI_API_URL,
	BES_API_URL: process.env.REACT_APP_BES_API_URL,
	ASSIGNMENT_API_URL: process.env.REACT_APP_ASSIGNMENT_API_URL,
	PROBLEMLOG_API_URL: process.env.REACT_APP_PROBLEMLOG_API_URL,
	PROBLEMTYPE_API_URL: process.env.REACT_APP_PROBLEMTYPE_API_URL,
	RESPONSETYPE_API_URL: process.env.REACT_APP_RESPONSETYPE_API_URL,
	IMPACTTYPE_API_URL: process.env.REACT_APP_IMPACTTYPE_API_URL,
	BMS_API_URL:process.env.REACT_APP_BMS_API_URL,
};
  
export const BasePathDev = '.';
export const BasePathProv = '../..';
export const BasePathSec = '..';
  
export const BasePath = BasePathDev;
  
export const NoteCode = {
	LEAKING: '1',
	BROKEN: '2',
	MISSING: '3',
	LOOSE: '4',
	WORN: '5',
	CRACK: '6',
	OTHERS: '7',
};
  
export const PriorityCode = {
	NOW: '1',
	NEXT_SHIFT: '2',
	NEXT_PS: '3',
	NEXT_BACKLOG: '4',
};
  
export const ConditionCode = {
	GOOD: 'NMG',
	BAD: 'NMB',
	UNCHECK: 'NMU',
	FLUID_LOW: 'FLL',
	FLUID_MEDIUM: 'FLM',
	FLUID_HIGH: 'FLH',
	VIOLANCE_SOFT: 'SVS',
	VIOLANCE_HARD: 'SVH',
	SOIL_THICK_CLEAN: 'TSC',
	SOIL_THICK_MEDIUM: 'TSM',
	SOIL_THICK_HIGH: 'TSH',
	REFRIGRERANT_EMPTY: 'TSE',
	REFRIGRERANT_LOW: 'RFL',
	REFRIGRERANT_HIGH: 'RFH',
	GRACE25: 'GRD',
	GRADE50: 'GRL',
	GRACE75: 'GRT',
	GRACE100: 'GRS',
};
  