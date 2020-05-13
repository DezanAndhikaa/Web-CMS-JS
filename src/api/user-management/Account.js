import BaseApi from '../base/index';
import apiConfig from '../../config/api.config';

const userManagementService = '/dca/api/login';

class AccountApi extends BaseApi {
    static newInstance = () => {
        if (!this.accountApi) this.accountApi = new AccountApi(apiConfig());
        return this.accountApi;
    };
    login = (data) => {
        return this.axios.post(`${userManagementService}`,data);
    };
}

export default AccountApi