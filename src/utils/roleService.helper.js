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
      if ((Array.isArray(role_name) && role_name.includes('OBD')) || role_name === 'OBD HO') {
        role = 1;
      }else if ((Array.isArray(role_name) && role_name.includes('FMC Headoffice')) || role_name === 'FMC Headoffice') { //service
        role = 2;
      }else if ((Array.isArray(role_name) && role_name.includes('SDH')) || role_name === 'SDH') { // sales dan service (view only)
        role = 3;
      }else if ((Array.isArray(role_name) && role_name.includes('SPV FMC')) || role_name === 'SPV FMC') {//service
        role = 4;
      }else if ((Array.isArray(role_name) && role_name.includes('SPV Non FMC')) || role_name === 'SPV Non FMC') {//sales site, view only
        role = 5;
      }else if ((Array.isArray(role_name) && role_name.includes('ASC')) || role_name === 'ASC') {//site sales
        role = 6;
      }else if ((Array.isArray(role_name) && role_name.includes('COP')) || role_name === 'COP') {//site sales
        role = 7;
      }else if ((Array.isArray(role_name) && role_name.includes('PDH')) || role_name === 'PDH') { //sales order
        role = 8;
      }else if ((Array.isArray(role_name) && role_name.includes('PPC FMC')) || role_name === 'PPC FMC') { //service
        role = 9;
      }else if ((Array.isArray(role_name) && role_name.includes('PPC Non FMC')) || role_name === 'PPC Non FMC') { //sales site (view only)
        role = 10;
      }else if ((Array.isArray(role_name) && role_name.includes('SDH FMC')) || role_name === 'SDH FMC') { //service
        role = 11;
      }else if ((Array.isArray(role_name) && role_name.includes('SDH Non FMC')) || role_name === 'SDH Non FMC') { //sales site (view only)
        role = 12;
      }

      return role;
    } catch (error) {
      this.jwtDecode = error;
      return this.jwtDecode;
    }
  };
}