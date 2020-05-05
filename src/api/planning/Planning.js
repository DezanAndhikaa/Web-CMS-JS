import BaseApi from 'api/base';
import apiConfig from 'config/api.config';

export default class AssignmentApi extends BaseApi{
    static newInstance = token => {
        if(!this.api) this.api = new AssignmentApi(apiConfig(token));
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
    
    assignJob = (parameter) => {
        return this.axios.post(`/dca/v1/assignment/assignjob`,parameter)
    }
    unassignJob = (WoIds) => {
        return this.axios.post(`/dca/v1/assignment/unassignjob`,{WoIds})
    }
    // note : value is the request paramater to server 
    assignmentSummary = (WoId) => {
        return this.axios.post(`/dca/v1/assignment/summary`,{WoId})
    }
}