import BaseApi from 'api/base';
import apiConfig from 'config/api.config';

export default class PlanningApi extends BaseApi{
    static newInstance = token => {
        if(!this.api) this.api = new PlanningApi(apiConfig(token));
        return this.api;
    }

    approveSales = (payload) => {
        return this.axios.get(`/cms/v1/salesorder/approval`, payload)
    }

    approveService = (payload) => {
        return this.axios.get(`/cms/v1/serviceorder/approval`, payload)
    }

    unapproveSales = (payload) => {
        return this.axios.get(`/cms/v1/salesorder/revision`, payload)
    }

    downloadSales = (soId) => {
        return this.axios.get(`/cms/v1/salesorder/downloadsalesorder`, soId)
    }

    downloadService= (woId) => {
        return this.axios.get(`/cms/v1/serviceorder/downloadserviceorder`, woId)
    }

    putLifetime= (payload) => {
        return this.axios.get(`/cms/v1/salesorder/lifetimecomponent`, payload)
    }

    putSapIssue= (payload, whichTabs) => {
        if(whichTabs){
            return this.axios.get(`/cms/v1/salesorder/sapissue`, payload)
        }else{
            return this.axios.get(`/cms/v1/serviceorder/sapissue`, payload)
        }
    }

    deleteSales = (payload) => {
        return this.axios.get(`/cms/v1/salesorder/delete`, payload)
    }

    deleteService = (payload) => {
        return this.axios.get(`/cms/v1/serviceorder/delete`, payload)
    }

    deletePermanentSales = (payload) => {
        return this.axios.get(`/cms/v1/salesorder/deletepermanent`, payload)
    }

    deletePermanentService = (payload) => {
        return this.axios.get(`/cms/v1/serviceorder/deletepermanent`, payload)
    }

    fetchSales = (payload) => {
        return this.axios.get(`/cms/v1/salesorder/filterunapproved`, payload)
    }

    fetchService= (payload) => {
        return this.axios.get(`/cms/v1/serviceorder/filterunapproved`, payload)
    }

    fetchSalesApproved = (payload) => {
        return this.axios.get(`/cms/v1/salesorder/filterapproved`, payload)
    }

    fetchServiceApproved = (payload) => {
        return this.axios.get(`/cms/v1/serviceorder/filterapproved`, payload)
    }

    fetchSalesDeleted = (payload) => {
        return this.axios.get(`/cms/v1/salesorder/filterdeleted`, payload)
    }

    fetchServiceDeleted = (payload) => {
        return this.axios.get(`/cms/v1/serviceorder/filterdeleted`, payload)
    }

    fetchSalesSap = (payload) => {
        return this.axios.get(`/cms/v1/salesorder/filterunapproved`, payload)
    }

    fetchServiceSap = (payload) => {
        return this.axios.get(`/cms/v1/serviceorder/filterunapproved`, payload)
    }

    fetchRevisedSales = (payload) => {
        return this.axios.get(`/cms/v1/salesorder/filterunapproved`, payload)
    }    
}