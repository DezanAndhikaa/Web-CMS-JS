import jwtDecode from 'jwt-decode';
import { userIdData } from './userLocalService.helper';

export default class roleService {
  constructor() {
    this.jwtDecode = null;
  }

  role = () => {
    try {
      this.jwtDecode = jwtDecode(userIdData().accessToken);
      const role_name = this.jwtDecode.role_name;
      let role = null;
      if (role_name.includes('OBD') || role_name.includes('DAD HO')) {
        role = 1;
      }else if (role_name.includes('ASC') || role_name.includes('COP') || role_name.includes('NFMC') || role_name.includes('PDH')
        || role_name.includes('PPC') || role_name.includes('PSC') || role_name.includes('PTO') || role_name.includes('SDH')
        || role_name.includes('SPV') || role_name.includes('Tarakan')) {
        role = 2;
      } else{
        role = 3
      }
      return role;
    } catch (error) {
      this.jwtDecode = error;
      return this.jwtDecode;
    }
  };
}