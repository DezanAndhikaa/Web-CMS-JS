

import { combineReducers } from 'redux';
import { ApiRequestActionsStatus } from '../../../core/RestClientHelpers';
import {
	// AssignPlansAction, 
	ClearSelectedPlans, 
	// FetchPlansAction, 
	// GetMechanicsAction, 
	GetServiceOrderAction, GetSalesOrderAction, 
	UpdatePlansParameterAction, ResetSelectedMechanicsAction, 
	// SearchPlansAction,
	// SelectCustomerFilterAction, 
	SelectSalesPlanAction,
	SelectServicePlanAction, 
	// SelectPlansAssignmentFilterAction,
	// SelectPlansTypeFilterAction, 
	SelectLeaderAction, SelectMechanicAction,
	// SelectUnitModelFilterAction,
	SortPlansByBacklogOpen, SortPlansByCustomer,
	SortPlansByPlanType, SortPlansByPlantExecution, SortPlansByStaging,
	SortPlansByStatus, SortPlansByUnitCode, SortPlansByUnitModel,
	SortPlansByWorkOrder,
	// UnassignPlansAction, 
	UnselectSalesPlanAction, UnselectServicePlanAction,
	UnselectMechanicAction, StoreSelectedPlanDataAction, ResetSelectedLeaderAction,
} from './DetailPages-action';

const initialPlansAssignment = {
	planTypeFilter: ['All Plan'],
	unitModelFilter: ['All Model'],
	customerFilter: ['All Customer'],
	tableValues: [],
	numberOfPage: 1,
	currentPage: 1,
	nextPage: false,
	prevPage: false,
	pageSize: 10,
	periodicInspectionHandover: 0,
	periodicInspectionTotal: 0,
	periodicInspectionUnassign: 0,
	periodicServiceHandover: 0,
	periodicServiceTotal: 0,
	unscheduleBreakdownHandover: 0,
	unscheduleBreakdownTotal: 0,
	unscheduleBreakdownUnassign: 0,
};

const initialParameter = {
	searchValue: '',
	plantypeFilter: '',
	unitModelFilter: '',
	customerFilter: '',
	assigmentFilter: true,
	inProgressFilter: false,
	approvalFilter: false,
	sortByUnitModel: false,
	sortByUnitCode: false,
	sortByPlanType: true,
	sortByWorkOrder: false,
	sortByWorkCenter: false,
	sortByCustomer: false,
	sortByPlantExecution: false,
	sortByStatus: false,
	sortByOpenBacklog: false,
	sortByStaging: false,
	orderDesc: false,
	currentPage: 1,
	pageSize: 10,
};

const initialSelectedAssignment = {
	selectedService: {},
	selectedSales: {},
};

const defaultState = { isActive: false, isAscending: true };
const plansSortbyInitialState = {
	SO: defaultState,
	Customer: defaultState,
	Site: defaultState,
	UnitModel: defaultState,
	CompDesc: defaultState,
	PartNumber: defaultState,
	UnitCode: defaultState,
	SerialNumber: defaultState,
	LifetimeComp: defaultState,
	PlantExecution: defaultState,
};

// const initialAssignmentState = { response: false, status: ApiRequestActionsStatus.IDLE };
const initialPlansState = { data: initialPlansAssignment, status: ApiRequestActionsStatus.IDLE };
const initialMechanicsState = { data: [], status: ApiRequestActionsStatus.IDLE };
const initialServiceOrderState = { data: [], status: ApiRequestActionsStatus.IDLE };
const initialSalesOrderState = { data: [], status: ApiRequestActionsStatus.IDLE };

// export function assignPlansReducer(state = initialAssignmentState, action) {
// 	if (action.type === AssignPlansAction) {
// 		switch (action.status) {
// 		case ApiRequestActionsStatus.SUCCEEDED:
// 			return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
// 		case ApiRequestActionsStatus.FAILED:
// 			return {
// 				response: initialAssignmentState.response,
// 				status: ApiRequestActionsStatus.FAILED,
// 				error: action.error,
// 			};
// 		default:
// 			return {
// 				response: initialAssignmentState.response,
// 				status: ApiRequestActionsStatus.LOADING,
// 			};
// 		}
// 	}
// 	return state;
// }

// export function fetchPlansReducer(state = initialPlansState, action) {
// 	if (action.type === FetchPlansAction) {
// 		switch (action.status) {
// 		case ApiRequestActionsStatus.SUCCEEDED:
// 			return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
// 		case ApiRequestActionsStatus.FAILED:
// 			return {
// 				data: initialPlansState.data,
// 				status: ApiRequestActionsStatus.FAILED,
// 				error: action.error,
// 			};
// 		default:
// 			return { data: initialPlansState.data, status: ApiRequestActionsStatus.LOADING };
// 		}
// 	}
// 	return state;
// }

export function getServiceOrderReducer(state = initialServiceOrderState, action) {
	if (action.type === GetServiceOrderAction) {
		switch (action.status) {
		case ApiRequestActionsStatus.SUCCEEDED:
			return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
		case ApiRequestActionsStatus.FAILED:
			return {
				data: initialServiceOrderState.data,
				status: ApiRequestActionsStatus.FAILED,
				error: action.error,
			};
		default:
			return { data: initialMechanicsState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function getSalesOrderReducer(state = initialSalesOrderState, action) {
	if (action.type === GetSalesOrderAction) {
		switch (action.status) {
		case ApiRequestActionsStatus.SUCCEEDED:
			return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
		case ApiRequestActionsStatus.FAILED:
			return {
				data: initialServiceOrderState.data,
				status: ApiRequestActionsStatus.FAILED,
				error: action.error,
			};
		default:
			return { data: initialMechanicsState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

// export function getMechanicsReducer(state = initialMechanicsState, action) {
// 	if (action.type === GetMechanicsAction) {
// 		switch (action.status) {
// 		case ApiRequestActionsStatus.SUCCEEDED:
// 			return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
// 		case ApiRequestActionsStatus.FAILED:
// 			return {
// 				data: initialMechanicsState.data,
// 				status: ApiRequestActionsStatus.FAILED,
// 				error: action.error,
// 			};
// 		default:
// 			return { data: initialMechanicsState.data, status: ApiRequestActionsStatus.LOADING };
// 		}
// 	}
// 	return state;
// }

export function plansParameterReducer(state = initialParameter, action) {
	if (action.type === UpdatePlansParameterAction) return action.payload;
	return state;
}

// export function searchPlansReducer(state = '', action) {
// 	if (action.type === SearchPlansAction) return action.payload;
// 	return state;
// }

// export function selectedFiltersReducer(state = initialSelectedFilter, action) {
// 	switch (action.type) {
// 	case SelectPlansTypeFilterAction:
// 		return { ...state, planType: action.payload };
// 	case SelectUnitModelFilterAction:
// 		return { ...state, unitModel: action.payload };
// 	case SelectCustomerFilterAction:
// 		return { ...state, customer: action.payload };
// 	case SelectPlansAssignmentFilterAction:
// 		return { ...state, plansAssignment: action.payload };
// 	default:
// 		return state;
// 	}
// }

export function selectPlansReducer(state = [], action) {
	switch (action.type) {
	case SelectSalesPlanAction:
		return [...state, action.payload];
	case SelectServicePlanAction:
		return [...state, action.payload];
	case UnselectSalesPlanAction: {
		return [...state.filter(((item) => item.SO !== action.payload.SO))];
	}
	case UnselectServicePlanAction: {
		return [...state.filter(((item) => item.Wo !== action.payload.Wo))];
	}
	case ClearSelectedPlans:
		return [];
	default:
		return state;
	}
}

export function selectLeaderReducer(state = {}, action) {
	switch (action.type) {
	case SelectLeaderAction:
		if (action.payload) return action.payload;
		return { ...state };
	case ResetSelectedLeaderAction:
		return {};
	default:
		return state;
	}
}

export function selectMechanicsReducer(state = [], action) {
	switch (action.type) {
	case SelectMechanicAction:
		if (action.payload) return [...state, action.payload];
		return [...state];
	case UnselectMechanicAction:
		return [...state.filter(((item) => item !== action.payload))];
	case ResetSelectedMechanicsAction:
		return [];
	default:
		return state;
	}
}

export function sortPlansByReducer(state = plansSortbyInitialState, action) {
	switch (action.type) {
	case SortPlansByUnitModel:
		return {
			...plansSortbyInitialState,
			unitModel: { isActive: true, isAscending: !state.unitModel.isAscending },
		};
	case SortPlansByUnitCode:
		return {
			...plansSortbyInitialState,
			unitCode: { isActive: true, isAscending: !state.unitCode.isAscending },
		};
	case SortPlansByPlanType:
		return {
			...plansSortbyInitialState,
			planType: { isActive: true, isAscending: !state.planType.isAscending },
		};
	case SortPlansByWorkOrder:
		return {
			...plansSortbyInitialState,
			workOrder: { isActive: true, isAscending: !state.workOrder.isAscending },
		};
	case SortPlansByCustomer:
		return {
			...plansSortbyInitialState,
			customer: { isActive: true, isAscending: !state.customer.isAscending },
		};
	case SortPlansByPlantExecution:
		return {
			...plansSortbyInitialState,
			plantExecution: { isActive: true, isAscending: !state.plantExecution.isAscending },
		};
	case SortPlansByBacklogOpen:
		return {
			...plansSortbyInitialState,
			backlogOpen: { isActive: true, isAscending: !state.backlogOpen.isAscending },
		};
	case SortPlansByStatus:
		return {
			...plansSortbyInitialState,
			status: { isActive: true, isAscending: !state.status.isAscending },
		};
	case SortPlansByStaging:
		return {
			...plansSortbyInitialState,
			staging: { isActive: true, isAscending: !state.staging.isAscending },
		};
	default:
		return state;
	}
}

export function storePlanDataReducer(state = {}, action) {
	if (action.type === StoreSelectedPlanDataAction) return action.payload;
	return { ...state };
}

// export function unassignPlansReducer(state = initialAssignmentState, action) {
// 	if (action.type === UnassignPlansAction) {
// 		switch (action.status) {
// 		case ApiRequestActionsStatus.SUCCEEDED:
// 			return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
// 		case ApiRequestActionsStatus.FAILED:
// 			return {
// 				response: state.response,
// 				status: ApiRequestActionsStatus.FAILED,
// 				error: action.error,
// 			};
// 		default:
// 			return { response: state.response, status: ApiRequestActionsStatus.LOADING };
// 		}
// 	}
// 	return state;
// }

const PlansReducers = combineReducers({
	selectedLeader: selectLeaderReducer,
	serviceOrderList: getServiceOrderReducer,
	salesOrderList: getSalesOrderReducer,
	// mechanicList: getMechanicsReducer,
	selectedPlans: selectPlansReducer,
	selectedMechanics: selectMechanicsReducer,
	// assignPlansStatus: assignPlansReducer,
	// unassignPlansStatus: unassignPlansReducer,
	plansParameter: plansParameterReducer,
	// PlansAssignmentSummary: fetchPlansReducer,
	// selectedFilters: selectedFiltersReducer,
	// sortBy: sortPlansByReducer,
	// searchValue: searchPlansReducer,
	selectedPlanData: storePlanDataReducer,
});

export { PlansReducers };
