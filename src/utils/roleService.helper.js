import jwtDecode from 'jwt-decode';
import { clientIdData } from './userLocalService.helper';

export default class roleService {
  constructor() {
    this.jwtDecode = null;
  }

  role = () => {
    try {
      this.jwtDecode = jwtDecode(clientIdData().accessToken);
      const role_name = this.jwtDecode.role_name;
      let role = null;
      if ((Array.isArray(role_name) && role_name.includes('OBD')) || role_name === 'OBD') {
        role = 1;
      }else if ((Array.isArray(role_name) && role_name.includes('SDH')) || role_name === 'SDH') {
        role = 2;
      }else if ((Array.isArray(role_name) && role_name.includes('PDC')) || role_name === 'PDC') {
        role = 3;
      }else if ((Array.isArray(role_name) && role_name.includes('SPV')) || role_name === 'SPV') {
        role = 4;
      }
      return role;
    } catch (error) {
      this.jwtDecode = error;
      return this.jwtDecode;
    }
  };
}
