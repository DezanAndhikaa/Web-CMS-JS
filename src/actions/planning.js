import { PlanningApi } from '../api';
import {
    REQUEST_TYPE,
    SUCCESS_TYPE,
    FAILURE_TYPE,
    LOGOUT_TYPE,
    APPROVE_SALES,
    APPROVE_SERVICE,
    UNAPPROVE_SALES,
    DOWNLOAD_SALES,
    DOWNLOAD_SERVICE,
    PUT_LIFETIME_COMP,
    PUT_SAP_ISSUE,
    DELETE_SALES,
    DELETE_SERVICE,
    DELETE_PERMANENT_SALES,
    DELETE_PERMANENT_SERVICE,
    FETCH_SALES_ORDER,
    FETCH_SERVICE_ORDER,
    FETCH_APPROVED_SALES,
    FETCH_APPROVED_SERVICE,
    FETCH_DELETED_SALES,
    FETCH_DELETED_SERVICE,
    FETCH_SAP_SALES,
    FETCH_SAP_SERVICE,
    FETCH_REVISED_SALES,
    STORE_SELECTED_PLAN_DATA
} from './actionTypes';

const api = token => PlanningApi.newInstance(token);

export function logoutAction() {
    return { type: LOGOUT_TYPE };
}

export const approveSales = (token) => async dispatch => {
    dispatch({
        type: `${APPROVE_SALES}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).approveSales(token);
        dispatch({
            type: `${APPROVE_SALES}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorApproveSales:', error);
        dispatch({
            type: `${APPROVE_SALES}${FAILURE_TYPE}`
        })
    }
}

export const approveService = (token) => async dispatch => {
    dispatch({
        type: `${APPROVE_SERVICE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).approveService(token);
        dispatch({
            type: `${APPROVE_SERVICE}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorApproveService:', error);
        dispatch({
            type: `${APPROVE_SERVICE}${FAILURE_TYPE}`
        })
    }
}

export const unapproveSales = (token) => async dispatch => {
    dispatch({
        type: `${UNAPPROVE_SALES}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).unapproveSales(token);
        dispatch({
            type: `${UNAPPROVE_SALES}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorUnapproveSales:', error);
        dispatch({
            type: `${UNAPPROVE_SALES}${FAILURE_TYPE}`
        })
    }
}

export const downloadSales = (token) => async dispatch => {
    dispatch({
        type: `${DOWNLOAD_SALES}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).downloadSales(token);
        dispatch({
            type: `${DOWNLOAD_SALES}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorDownloadSales:', error);
        dispatch({
            type: `${DOWNLOAD_SALES}${FAILURE_TYPE}`
        })
    }
}

export const downloadService = (token) => async dispatch => {
    dispatch({
        type: `${DOWNLOAD_SERVICE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).downloadService(token);
        dispatch({
            type: `${DOWNLOAD_SERVICE}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorDownloadService:', error);
        dispatch({
            type: `${DOWNLOAD_SERVICE}${FAILURE_TYPE}`
        })
    }
}

export const putLifetimeComp = (token) => async dispatch => {
    dispatch({
        type: `${PUT_LIFETIME_COMP}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).putLifetime(token);
        dispatch({
            type: `${PUT_LIFETIME_COMP}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorPutLifetime:', error);
        dispatch({
            type: `${PUT_LIFETIME_COMP}${FAILURE_TYPE}`
        })
    }
}

export const putSapIssue = (token) => async dispatch => {
    dispatch({
        type: `${PUT_SAP_ISSUE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).putSapIssue(token);
        dispatch({
            type: `${PUT_SAP_ISSUE}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorPutSapIssue:', error);
        dispatch({
            type: `${PUT_SAP_ISSUE}${FAILURE_TYPE}`
        })
    }
}

export const deleteSales = (token) => async dispatch => {
    dispatch({
        type: `${DELETE_SALES}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).deleteSales(token);
        dispatch({
            type: `${DELETE_SALES}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorDeleteSales:', error);
        dispatch({
            type: `${DELETE_SALES}${FAILURE_TYPE}`
        })
    }
}

export const deleteService = (token) => async dispatch => {
    dispatch({
        type: `${DELETE_SERVICE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).deleteService(token);
        dispatch({
            type: `${DELETE_SERVICE}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorDeleteService:', error);
        dispatch({
            type: `${DELETE_SERVICE}${FAILURE_TYPE}`
        })
    }
}

export const deletePermanentSales = (token) => async dispatch => {
    dispatch({
        type: `${DELETE_PERMANENT_SALES}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).deletePermanentSales(token);
        dispatch({
            type: `${DELETE_PERMANENT_SALES}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorDelPermanentSales:', error);
        dispatch({
            type: `${DELETE_PERMANENT_SALES}${FAILURE_TYPE}`
        })
    }
}

export const deletePermanentService = (token) => async dispatch => {
    dispatch({
        type: `${DELETE_PERMANENT_SERVICE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).deletePermanentService(token);
        dispatch({
            type: `${DELETE_PERMANENT_SERVICE}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorDelPermanentService:', error);
        dispatch({
            type: `${DELETE_PERMANENT_SERVICE}${FAILURE_TYPE}`
        })
    }
}


export const fetchSales = (token) => async dispatch => {
    dispatch({
        type: `${FETCH_SALES_ORDER}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).fetchSales(token);
        dispatch({
            type: `${FETCH_SALES_ORDER}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorFetchSales:', error);
        dispatch({
            type: `${FETCH_SALES_ORDER}${FAILURE_TYPE}`
        })
    }
}

export const fetchService = (token) => async dispatch => {
    dispatch({
        type: `${FETCH_SERVICE_ORDER}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).fetchService(token);
        dispatch({
            type: `${FETCH_SERVICE_ORDER}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorFetchService:', error);
        dispatch({
            type: `${FETCH_SERVICE_ORDER}${FAILURE_TYPE}`
        })
    }
}

export const fetchApprovedSales = (token) => async dispatch => {
    dispatch({
        type: `${FETCH_APPROVED_SALES}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).fetchApprovedSales(token);
        dispatch({
            type: `${FETCH_APPROVED_SALES}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorFetchApprovedSales:', error);
        dispatch({
            type: `${FETCH_APPROVED_SALES}${FAILURE_TYPE}`
        })
    }
}

export const fetchApprovedService = (token) => async dispatch => {
    dispatch({
        type: `${FETCH_APPROVED_SERVICE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).fetchApprovedService(token);
        dispatch({
            type: `${FETCH_APPROVED_SERVICE}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorFetchApprovedService:', error);
        dispatch({
            type: `${FETCH_APPROVED_SERVICE}${FAILURE_TYPE}`
        })
    }
}

export const fetchDeletedSales = (token) => async dispatch => {
    dispatch({
        type: `${FETCH_DELETED_SALES}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).fetchDeletedSales(token);
        dispatch({
            type: `${FETCH_DELETED_SALES}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorFetchDelSales:', error);
        dispatch({
            type: `${FETCH_DELETED_SALES}${FAILURE_TYPE}`
        })
    }
}

export const fetchDeletedService = (token) => async dispatch => {
    dispatch({
        type: `${FETCH_DELETED_SERVICE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).fetchDeletedService(token);
        dispatch({
            type: `${FETCH_DELETED_SERVICE}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorFetchDelSales:', error);
        dispatch({
            type: `${FETCH_DELETED_SERVICE}${FAILURE_TYPE}`
        })
    }
}

export const fetchSapSales = (token) => async dispatch => {
    dispatch({
        type: `${FETCH_SAP_SALES}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).fetchSapSales(token);
        dispatch({
            type: `${FETCH_SAP_SALES}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorFetchSapSales:', error);
        dispatch({
            type: `${FETCH_SAP_SALES}${FAILURE_TYPE}`
        })
    }
}

export const fetchSapService = (token) => async dispatch => {
    dispatch({
        type: `${FETCH_SAP_SERVICE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).fetchSapService(token);
        dispatch({
            type: `${FETCH_SAP_SERVICE}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorFetchSapService:', error);
        dispatch({
            type: `${FETCH_SAP_SERVICE}${FAILURE_TYPE}`
        })
    }
}

export const fetchRevisedSales = (token) => async dispatch => {
    dispatch({
        type: `${FETCH_REVISED_SALES}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).fetchRevisedSales(token);
        dispatch({
            type: `${FETCH_REVISED_SALES}${SUCCESS_TYPE}`,
            payload: { data: res.data }
        });
    } catch (error) {
        console.log('errorFetchRevSales:', error);
        dispatch({
            type: `${FETCH_REVISED_SALES}${FAILURE_TYPE}`
        })
    }
}

export function searchSalesParameterAction(type, payload) {
    return { type, payload };
}

export function searchSalesRevisionParameterAction(type, payload) {
    return { type, payload };
}

export function searchSalesApprovedAction(type, payload) {
    return { type, payload };
}

export function searchSalesDeletedAction(type, payload) {
    return { type, payload };
}

export function searchSalesSapAction(type, payload) {
    return { type, payload };
}

export function searchServiceParameterAction(type, payload) {
    return { type, payload };
}

export function searchServiceApprovedAction(type, payload) {
    return { type, payload };
}

export function searchServiceDeletedAction(type, payload) {
    return { type, payload };
}

export function searchServiceSapAction(type, payload) {
    return { type, payload };
}

export function salesParameterAction(type, payload) {
    return { type, payload };
}
export function salesParameterApprovedAction(type, payload) {
    return { type, payload };
}
export function salesParameterDeletedAction(type, payload) {
    return { type, payload };
}
export function salesParameterSapAction(type, payload) {
    return { type, payload };
}
export function serviceParameterAction(type, payload) {
    return { type, payload };
}
export function serviceParameterApprovedAction(type, payload) {
    return { type, payload };
}
export function serviceParameterDeletedAction(type, payload) {
    return { type, payload };
}
export function serviceParameterSapAction(type, payload) {
    return { type, payload };
}
export function salesParameterRevAction(type, payload) {
    return { type, payload };
}
export function searchAction(type, payload) {
    return { type, payload };
}
export function searchCompAction(type, payload, sort) {
    return { type, payload, sort };
}
export function searchCompActionService(type, payload, sort) {
    return { type, payload, sort };
}
export function dateFilterAction(type, payload, payload2, page) {
    return { type, payload, payload2, page };
}
export function smrDateFilterAction(type, payload, payload2, page) {
  return { type, payload, payload2, page };
}
export function selectFilterAction(type, payload, payload2, page) {
    return { type, payload, payload2, page };
}
export function selectFilterAction2(type, payload, head, page) {
    return { type, payload, head, page };
}
export function indexFilterAction(type, payload) {
    return { type, payload };
}
export function selectSalesPlansAction(type, payload) {
    return { type, payload };
}
export function selectServicePlansAction(type, payload) {
    return { type, payload };
}
export function selectLeaderAction(type, payload) {
    return { type, payload };
}
export function selectMechanicAction(type, payload) {
    return { type, payload };
}
export function sortByAction(type) {
    return { type };
}
export function storePlanDataAction(payload) {
    return { type: STORE_SELECTED_PLAN_DATA, payload };
}