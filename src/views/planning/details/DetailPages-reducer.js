/* eslint-disable no-mixed-spaces-and-tabs */
import { combineReducers } from 'redux';
import { ApiRequestActionsStatus } from '../../../core/RestClientHelpers';
import {
	AssignSalesAction, 
	ClearSelectedPlans,
	// FetchSearchValueAction, 
	// FetchPlansAction, 
	// GetMechanicsAction, 
	// GetServiceOrderAction, GetSalesOrderAction, 
	UpdateSalesParameterAction, ResetSelectedMechanicsAction, 
	SearchSalesAction,
	SearchSoAction,
	// SelectCustomerFilterAction, 
	SelectSalesPlanAction,
	SelectServicePlanAction, 
	// SelectPlansAssignmentFilterAction,
	// SelectPlansTypeFilterAction, 
	SelectLeaderAction, SelectMechanicAction,
	SelectCustomerFilterAction,SelectComponentFilterAction,
	SelectSiteFilterAction,SelectUnitModelFilterAction,
	// SelectUnitModelFilterAction,
	SortSalesByCustomer, SortSalesBySite, SortSalesByUnitModel, SortSalesByCompDesc, UpdateServiceParameterAction,
	FetchSalesAction,
	SortServiceByCustomer, SortServiceBySite, SortServiceByUnitModel, SortServiceByCompDesc,
	// UnassignPlansAction, 
	UnselectSalesPlanAction, UnselectServicePlanAction,
	UnselectMechanicAction, StoreSelectedPlanDataAction, ResetSelectedLeaderAction, getSearchValueAction, fetchServiceAction, FetchServiceAction,
} from './DetailPages-action';

const initialSalesAssignment = {
	TotalData: 0,
	TotalPage: 1,
	PageNumber: 1,
	PageSize: 10,
	Lists: [],
	NextPage: false,
	PrevPage: false,
	GroupCustomer: ['All Customer'],
	GroupSite: ['All Site'],
	GroupUnitModel: ['All Unit Model'],
	GroupComponentDescription: ['All Component Description'],
	GroupSerialNumber: [],
	GroupLifeTimeComponent: [],
	GroupPlanExecution: [],
};
const initialServiceAssignment = {
	TotalData: 0,
	TotalPage: 1,
	PageNumber: 1,
	PageSize: 10,
	Lists: [],
	NextPage: false,
	PrevPage: false,
	GroupSo: ['All WO'],
	GroupCustomer: ['ALL CUSTOMER'],
	GroupSite: ['ALL SITE'],
	GroupUnitModel: ['ALL UNIT MODEL'],
	GroupSerialNumber: [],
	GroupLifeTimeComponent: [],
	GroupPlanExecution: [],
};

const initialSelectedFilter = {
	customerType: 'All Customer',
	siteType: 'All Site',
	unitType: 'All Unit Model',
	compType: 'All Component'
	// customerType: '',
	// siteType: '',
	// unitType: '',
	// compType: ''

};

const initialSalesParameter = {
	dataFilter : {
			  PageNumber : 1,
			  PageSize: 2,
			  Sort: '',
		//   Filter: [
		// 	{
		// 	  Field: '',
		// 	  Operator: '',
		// 	  Value: '',
		// 	  Logic: ''
		// 	}
		//   ]
		
	},
	paramsData : {
		PageNumber: 0,
		searchValue: '',
		soValue: '',
		customerType : '',
		siteType : '',
		unitType : '',
		compType : '',
		assigmentFilter: true,
		inProgressFilter: false,
	}
	// approvalFilter: false,
	// sortByUnitModel: false,
	// sortByUnitCode: false,
	// sortByPlanType: true,
	// sortByWorkOrder: false,
	// sortByWorkCenter: false,
	// sortByCustomer: false,
	// sortByPlantExecution: false,
	// sortByStatus: false,
	// sortByOpenBacklog: false,
	// sortByStaging: false,
	// orderDesc: false,
	// currentPage: 1,
	// pageSize: 10,
};
const initialServiceParameter = {
	dataFilter : {
			  PageNumber : 1,
			  PageSize: 2,
			  Sort: '',
		//   Filter: [
		// 	{
		// 	  Field: '',
		// 	  Operator: '',
		// 	  Value: '',
		// 	  Logic: ''
		// 	}
		//   ]
		
	},
	paramsData : {
		PageNumber: 0,
		searchValue: '',
		soValue: '',
		customerType : '',
		siteType : '',
		unitType : '',
		compType : '',
		assigmentFilter: true,
		inProgressFilter: false,
	}
	// approvalFilter: false,
	// sortByUnitModel: false,
	// sortByUnitCode: false,
	// sortByPlanType: true,
	// sortByWorkOrder: false,
	// sortByWorkCenter: false,
	// sortByCustomer: false,
	// sortByPlantExecution: false,
	// sortByStatus: false,
	// sortByOpenBacklog: false,
	// sortByStaging: false,
	// orderDesc: false,
	// currentPage: 1,
	// pageSize: 10,
};

const initialSelectedAssignment = {
	selectedService: [],
	selectedSales: [],
};

const defaultState = { isActive: false, isAscending: true };
const salesSortbyInitialState = {	
	Customer: defaultState,
	Site: defaultState,
	UnitModel: defaultState,
	CompDesc: defaultState,
};
const serviceSortbyInitialState = {	
	Customer: defaultState,
	Site: defaultState,
	UnitModel: defaultState,
	CompDesc: defaultState,
};

const initialAssignmentState = { response: false, status: ApiRequestActionsStatus.IDLE };
const initialSalesState = { data: initialSalesAssignment, status: ApiRequestActionsStatus.IDLE };
const initialServiceState = { data: initialServiceAssignment, status: ApiRequestActionsStatus.IDLE };
const initialMechanicsState = { data: [], status: ApiRequestActionsStatus.IDLE };

export function assignSalesReducer(state = initialAssignmentState, action) {
	if (action.type === AssignSalesAction) {
		switch (action.status) {
		case ApiRequestActionsStatus.SUCCEEDED:
			return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
		case ApiRequestActionsStatus.FAILED:
			return {
				response: initialAssignmentState.response,
				status: ApiRequestActionsStatus.FAILED,
				error: action.error,
			};
		default:
			return {
				response: initialAssignmentState.response,
				status: ApiRequestActionsStatus.LOADING,
			};
		}
	}
	return state;
}

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
export function fetchSalesReducer(state = initialSalesState, action) {
	if (action.type === FetchSalesAction) {
	  switch (action.status) {
		case ApiRequestActionsStatus.SUCCEEDED:
			console.log('ini balikan dari mantan',action.payload);
		  return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
		case ApiRequestActionsStatus.FAILED:
		  return {
				data: initialSalesState.data,
				status: ApiRequestActionsStatus.FAILED,
				error: action.error,
		  };
		default:
		  return { data: initialSalesState.data, status: ApiRequestActionsStatus.LOADING };
	  }
	}
	return state;
}

export function fetchServiceReducer(state = initialServiceState, action) {
	if (action.type === FetchServiceAction) {
		switch (action.status) {
		case ApiRequestActionsStatus.SUCCEEDED:
			return { ...state, data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
		case ApiRequestActionsStatus.FAILED:
			return {
				data: initialServiceState.data,
				status: ApiRequestActionsStatus.FAILED,
				error: action.error,
			};
		default:
			return { data: initialMechanicsState.data, status: ApiRequestActionsStatus.LOADING };
		}
	}
	return state;
}

export function selectedFiltersReducer(state = initialSelectedFilter, action) {
	console.log('aku adalah aksi: ',action);
	switch (action.type) {
	  case SelectCustomerFilterAction:
		return { ...state, customerType: action.payload };
	  case SelectSiteFilterAction:
		return { ...state, siteType: action.payload };
	  case SelectUnitModelFilterAction:
		return { ...state, unitType: action.payload };
	case SelectComponentFilterAction:
	    return { ...state, compType: action.payload };
	  default:
		return state;
	}
}

// export function getSalesOrderReducer(state = initialSalesOrderState, action) {
// 	if (action.type === GetSalesOrderAction) {
// 		switch (action.status) {
// 		case ApiRequestActionsStatus.SUCCEEDED:
// 			return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED };
// 		case ApiRequestActionsStatus.FAILED:
// 			return {
// 				data: initialServiceOrderState.data,
// 				status: ApiRequestActionsStatus.FAILED,
// 				error: action.error,
// 			};
// 		default:
// 			return { data: initialMechanicsState.data, status: ApiRequestActionsStatus.LOADING };
// 		}
// 	}
// 	return state;
// }

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

export function salesParameterReducer(state = initialSalesParameter, action) {
	console.log('ini data reducer action/payload', action.payload);
	if (action.type === UpdateSalesParameterAction) return  action.payload;
	return state;
}
export function serviceParameterReducer(state = initialServiceParameter, action) {
	if (action.type === UpdateServiceParameterAction) return action.payload;
	return state;
}

export function searchPlansReducer(state = '', action) {
	if (action.type === SearchSalesAction) return action.payload;
	return state;
}

export function searchSoReducer(state = '', action) {
	if (action.type === SearchSoAction) return action.payload;
	return state;
}

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

export function selectPlansReducer(state = initialSelectedAssignment, action) {
	switch (action.type) {
	case SelectSalesPlanAction:
		return [...state.selectedSales, action.payload];
	case SelectServicePlanAction:
		return [...state.selectedService, action.payload];
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

export function sortSalesByReducer(state = salesSortbyInitialState, action) {
	switch (action.type) {
	case SortSalesByCustomer:
		console.log('sort berjalan', action);
		return {
			...salesSortbyInitialState,
			Customer: { isActive: true, isAscending: !state.Customer.isAscending },
		};
	case SortSalesBySite:
		return {
			...salesSortbyInitialState,
			Site: { isActive: true, isAscending: !state.Site.isAscending },
		};
	case SortSalesByUnitModel:
		return {
			...salesSortbyInitialState,
			UnitModel: { isActive: true, isAscending: !state.UnitModel.isAscending },
		};
	case SortSalesByCompDesc:
		return {
			...salesSortbyInitialState,
			CompDesc: { isActive: true, isAscending: !state.CompDesc.isAscending },
		};
	default:
		return state;
	}
}


export function sortServiceByReducer(state = serviceSortbyInitialState, action) {
	switch (action.type) {
	case SortServiceByCustomer:
		console.log('sort berjalan', action);
		return {
			...serviceSortbyInitialState,
			Customer: { isActive: true, isAscending: !state.Customer.isAscending },
		};
	case SortServiceBySite:
		return {
			...serviceSortbyInitialState,
			Site: { isActive: true, isAscending: !state.Site.isAscending },
		};
	case SortServiceByUnitModel:
		return {
			...serviceSortbyInitialState,
			UnitModel: { isActive: true, isAscending: !state.UnitModel.isAscending },
		};
	case SortServiceByCompDesc:
		return {
			...serviceSortbyInitialState,
			CompDesc: { isActive: true, isAscending: !state.CompDesc.isAscending },
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
	selectedFilters: selectedFiltersReducer,
	serviceOrderList: fetchServiceReducer,
	salesOrderList : fetchSalesReducer,
	// salesOrderList : getSearchValueReducer,
	// salesOrderList: getSalesOrderReducer,
	// mechanicList: getMechanicsReducer,
	selectedPlans: selectPlansReducer,
	selectedMechanics: selectMechanicsReducer,
	// assignPlansStatus: assignPlansReducer,
	// unassignPlansStatus: unassignPlansReducer,
	salesParameter: salesParameterReducer,
	serviceParameter: serviceParameterReducer,
	// PlansAssignmentSummary: fetchPlansReducer,
	sortSalesBy: sortSalesByReducer,
	sortServiceBy: sortServiceByReducer,
	Search: searchPlansReducer,
	soValue: searchSoReducer,
	selectedPlanData: storePlanDataReducer,
});

export { PlansReducers };