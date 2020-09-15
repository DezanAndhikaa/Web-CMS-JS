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
        return role = 1;
      }else{
        return role = 2;
      }
    } catch (error) {
      this.jwtDecode = error;
      return this.jwtDecode;
    }
  };
}