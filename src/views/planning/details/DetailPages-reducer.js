/* eslint-disable no-mixed-spaces-and-tabs */
import { combineReducers } from 'redux';
import update from 'immutability-helper';
import { ApiRequestActionsStatus } from '../../../core/RestClientHelpers';
import {
	// ApproveSalesAction, 
	ClearSelectedPlans,
	FetchApprovedSalesAction,
	FetchApprovedServiceAction,
	FetchDeletedSalesAction,
	FetchDeletedServiceAction,
	// FetchSearchValueAction, 
	// FetchPlansAction, 
	// GetMechanicsAction, 
	// GetServiceOrderAction, GetSalesOrderAction, 
	UpdateSalesParameterAction, ResetSelectedMechanicsAction, 
	SearchSalesAction,
	SearchServiceAction,
	SearchCompAction,SearchCompActionService,
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
	UpdateFilterUnit,IndexFilterAction, SelectAllSalesPlanAction
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
};

const initialSalesParameter = {
	dataFilter : {
		PageNumber : 1,
		PageSize: 2,
		Sort: '',
		Filter: [
			// {
			//   Field: '',
			//   Operator: '',
			//   Value: '',
			//   Logic: ''
			// }
		]
	},
	paramsData : {
		PageNumber: 0,
		Search: '',
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
	// dataFilter : {
	dataFilter: {
			  PageNumber : 1,
			  PageSize: 2,
			  Sort: '',
		  Filter: [
			// {
			//   Field: '',
			//   Operator: '',
			//   Value: '',
			//   Logic: ''
			// }
		  ]
	},
	// },
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

const initialSearchCompParameter = 
[{
	Field	: '',
	Operator: 'contains',
	Value   : '',
	Logic   : 'OR'
}]

const initialSearchSalesParameter =
[{
	Field	: 'SO',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'Customer',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'Site',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'UnitModel',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'ComponentDescription',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'PartNumber',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'UnitCode',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'SerialNumber',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'LifeTimeComponent',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'PlanExecution',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
}];

const initialSearchServiceParameter =
[{
	Field	: 'Wo',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'Customer',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'Site',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'UnitModel',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'ComponentDescription',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'PartNumber',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'UnitCode',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'SerialNumber',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'LifeTimeComponent',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
},
{
	Field	: 'PlanExecution',
	Operator: 'contains',
	Value 	: '',
	Logic 	: 'OR'
}];


const initialAssignmentState = { response: false, status: ApiRequestActionsStatus.IDLE };
const initialSalesState = { data: initialSalesAssignment, status: ApiRequestActionsStatus.IDLE };
const initialServiceState = { data: initialServiceAssignment, status: ApiRequestActionsStatus.IDLE };
const initialMechanicsState = { data: [], status: ApiRequestActionsStatus.IDLE };
// const initialSearchParameter = { Filter : [
// 	initialSearchSOParameter, initialSearchCustomerParameter, 
// 	initialSearchSiteParameter, initialSearchPartNumberParameter, 
// 	initialSearchUnitModelParameter, initialSearchComponentDescriptionParameter, 
// 	initialSearchUnitCodeParameter, initialSearchSerialNumberParameter, 
// 	initialSearchLifeTimeCompParameter,initialSearchPlanExecutionParameter ] };

export function fetchSalesReducer(state = initialSalesState, action) {
	if (action.type === FetchSalesAction) {
	  switch (action.status) {
		case ApiRequestActionsStatus.SUCCEEDED:
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

export function fetchApprovedSalesReducer(state = initialSalesState, action) {
	if (action.type === FetchApprovedSalesAction) {
	  switch (action.status) {
		case ApiRequestActionsStatus.SUCCEEDED:
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

export function fetchApprovedServiceReducer(state = initialServiceState, action) {
	if (action.type === FetchApprovedServiceAction) {
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

export function fetchDeletedSalesReducer(state = initialSalesState, action) {
	if (action.type === FetchDeletedSalesAction) {
	  switch (action.status) {
		case ApiRequestActionsStatus.SUCCEEDED:
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

export function fetchDeletedServiceReducer(state = initialServiceState, action) {
	if (action.type === FetchDeletedServiceAction) {
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

export function salesParameterReducer(state = initialSalesParameter, action) {
	if (action.type === UpdateSalesParameterAction)
		return {...state, dataFilter: action.payload};
	return state;
}

export function filterParameterReducer(state = [], action){
	if (action.type === SelectCustomerFilterAction)
		if(state.length === 0){ //IF yang pertama ini,jika filternya belum di isi apa2 (filter belum di jalankan)
			return {...state, dataFilter: {Filter : [{Field: 'Customer', Operator: 'eq', Value: action.payload, Logic: 'and'}] }};
		}else{
			for(let i=0; i<state.dataFilter.Filter.length; i++){ //FOR di sini untuk mengecek pada objek sebelumnya
				if(state.dataFilter.Filter[i].Field === action.head){ //JIKA pada objek sebelumnya pada "field" ada yang sama, maka akan merubah nilai pada "value" tersebut tanpa menambah array
					if(action.payload === 'All'){
						state.dataFilter.Filter.splice(i,1);
						return {dataFilter : {Filter : state.dataFilter.Filter }};
					}
					return { dataFilter : {Filter : state.dataFilter.Filter.map(el => (el.Field === action.head ? {...el,Value : action.payload} : el )) }};		
				}
			}
			return {dataFilter: {Filter : [...state.dataFilter.Filter,{Field: 'Customer', Operator: 'eq', Value: action.payload, Logic: 'and'}] }};
		}
	if(action.type === SelectSiteFilterAction)
		if(state.length === 0){
			return {...state, dataFilter: {Filter : [{Field: 'Site', Operator: 'eq', Value: action.payload, Logic: 'and'}] }};
		}else{
			for(let i=0; i<state.dataFilter.Filter.length; i++){
				if(state.dataFilter.Filter[i].Field === action.head){
					if(action.payload === 'All'){
						state.dataFilter.Filter.splice(i,1);
						return {dataFilter : {Filter : state.dataFilter.Filter }};
					}
					return { dataFilter : {Filter : state.dataFilter.Filter.map(el => (el.Field === action.head ? {...el,Value : action.payload} : el )) }};		
				}
			}
			return {dataFilter: {Filter : [...state.dataFilter.Filter,{Field: 'Site', Operator: 'eq', Value: action.payload, Logic: 'and'}] }};
		}
	if (action.type === SelectUnitModelFilterAction)
		if(state.length === 0){
			return {...state, dataFilter: {Filter : [{Field: 'UnitModel', Operator: 'eq', Value: action.payload, Logic: 'and'}] }};
		}else{
			for(let i=0; i<state.dataFilter.Filter.length; i++){
				if(state.dataFilter.Filter[i].Field === action.head){
					if(action.payload === 'All'){
						state.dataFilter.Filter.splice(i,1);
						return {dataFilter : {Filter : state.dataFilter.Filter }};
					}
					return { dataFilter : {Filter : state.dataFilter.Filter.map(el => (el.Field === action.head ? {...el,Value : action.payload} : el )) }};		
				}
			}
			return {dataFilter: {Filter : [...state.dataFilter.Filter,{Field: 'UnitModel', Operator: 'eq', Value: action.payload, Logic: 'and'}] }};
		}
	if (action.type === SelectComponentFilterAction)
		if(state.length === 0){
			return {...state, dataFilter: {Filter : [{Field: 'ComponentDescription', Operator: 'eq', Value: action.payload, Logic: 'and'}] }};
		}else{
			for(let i=0; i<state.dataFilter.Filter.length; i++){
				if(state.dataFilter.Filter[i].Field === action.head){
					if(action.payload === 'All'){
						state.dataFilter.Filter.splice(i,1);
						return {dataFilter : {Filter : state.dataFilter.Filter }};
					}
					return { dataFilter : {Filter : state.dataFilter.Filter.map(el => (el.Field === action.head ? {...el,Value : action.payload} : el )) }};		
				}
			}
			return {dataFilter: {Filter : [...state.dataFilter.Filter,{Field: 'ComponentDescription', Operator: 'eq', Value: action.payload, Logic: 'and'}] }};
		}
	return state;
}

export function indexFilterParameterReducer(state = '', action){
	if (action.type === IndexFilterAction){
		return {...state, indexTabParameter : action.payload};
	}
	return state;
}

export function serviceParameterReducer(state = initialServiceParameter, action) {
	if (action.type === UpdateServiceParameterAction)
		return {...state, dataFilter: action.payload};
	return state;
}

//ini reducer untuk global search dibagian sales order, menggunakan react-addons-update
export function searchSalesPlansReducer(state = initialSearchSalesParameter, action) {
	console.log('ini data untuk search value', action.payload);
	console.log('mmmmmm', state.length);
	if (action.type === SearchSalesAction){
		var howManyRows = state.length;
		var j = 0;
		let array = [];
		for( j ; j < howManyRows; j++){
			
			console.log('aaaaaaaa', j);
			let updatedArray = update(state[j], {Value:{$set: action.payload}});
			array = [...array, updatedArray];
			console.log('aaaaaa', array);
			
		}
		return array;
	}
	return state;
}

//ini reducer untuk global search dibagian service order, menggunakan react-addons-update
export function searchServicePlansReducer(state = initialSearchServiceParameter, action) {
	console.log('ini data untuk search value', action.payload);
	console.log('mmmmmm', state.length);
	if (action.type === SearchServiceAction){
		var howManyRows = state.length;
		var j = 0;
		let array = [];
		for( j ; j < howManyRows; j++){
			
			console.log('aaaaaaaa', j);
			let updatedArray = update(state[j], {Value:{$set: action.payload}});
			array = [...array, updatedArray];
			console.log('aaaaaa', array);
			
		}
		console.log('aaaa', JSON.stringify(array));
		return array;
	}
	return state;
}

export function searchCompReducer(state = initialSearchCompParameter, action) {
	if (action.type === SearchCompAction) {
		if(action.sort === "So"){
			let updatedArray = update(state, {[0]: {Field:{$set: action.sort},Value:{$set: action.payload}} });
			return updatedArray;
		}else if(action.sort === "PartNumber"){
			let updatedArray = update(state, {[0]: {Field:{$set: action.sort},Value:{$set: action.payload}} });
			return updatedArray;
		}else if(action.sort === "UnitCode"){
			let updatedArray = update(state, {[0]: {Field:{$set: action.sort},Value:{$set: action.payload}} });
			return updatedArray;
		}else{
			let updatedArray = update(state, {[0]: {Field:{$set: action.sort},Value:{$set: action.payload}} });
			return updatedArray;
		}
	}else if(action.type === SearchCompActionService){
		console.log("gatot awal ")
		if(action.sort === "Wo"){
			let updatedArray = update(state, {[0]: {Field:{$set: action.sort},Value:{$set: action.payload}} });
			return updatedArray;
		}else if(action.sort === "PartNumber"){
			let updatedArray = update(state, {[0]: {Field:{$set: action.sort},Value:{$set: action.payload}} });
			return updatedArray;
		}else if(action.sort === "UnitCode"){
			let updatedArray = update(state, {[0]: {Field:{$set: action.sort},Value:{$set: action.payload}} });
			return updatedArray;
		}else{
			let updatedArray = update(state, {[0]: {Field:{$set: action.sort},Value:{$set: action.payload}} });
			return updatedArray;
		}
	}
	return state;
}

export function selectSalesPlansReducer(state = [], action) {
	switch (action.type) {
	case SelectSalesPlanAction: {
		return [...state, action.payload];
		// return [...state.map(((item) => item.SO !== action.payload))];
	}
	// case SelectAllSalesPlanAction:{
	// 	return [...state.(((item) => item.SO === action.payload))];
	// }
	case UnselectSalesPlanAction: {
		return [...state.filter(((item) => item.SO !== action.payload.SO))];
	}
	case ClearSelectedPlans:
		return [];
	default:
		return state;
	}
}
export function selectServicePlansReducer(state = [], action) {
	switch (action.type) {
	case SelectServicePlanAction:{
		return [...state, action.payload];
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

// export function unapproveSalesReducer(state = initialAssignmentState, action) {
// 	if (action.type === UnapproveSalesAction) {
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
	salesOrderListApproved : fetchApprovedSalesReducer,
	serviceOrderListApproved : fetchApprovedServiceReducer,
	salesOrderListDeleted : fetchApprovedSalesReducer,
	serviceOrderListDeleted : fetchDeletedServiceReducer,
	// salesOrderList : getSearchValueReducer,
	// salesOrderList: getSalesOrderReducer,
	// mechanicList: getMechanicsReducer,
	selectedSalesPlans: selectSalesPlansReducer,
	selectedServicePlans: selectServicePlansReducer,
	selectedMechanics: selectMechanicsReducer,
	// approveSalesStatus: approveSalesReducer,
	// unapproveSalesStatus: unapproveSalesReducer,
	salesParameter: salesParameterReducer,
	filterParameter: filterParameterReducer,
	indexFilterParameter: indexFilterParameterReducer,
	serviceParameter: serviceParameterReducer,
	// PlansAssignmentSummary: fetchPlansReducer,
	sortSalesBy: sortSalesByReducer,
	sortServiceBy: sortServiceByReducer,
	salesSearch: searchSalesPlansReducer,
	serviceSearch: searchServicePlansReducer,
	searchComp: searchCompReducer,
	selectedPlanData: storePlanDataReducer,
});

export { PlansReducers };