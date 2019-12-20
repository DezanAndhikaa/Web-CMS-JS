import axios from 'axios';

export const Base = axios.create({
	baseURL: 'http://10.200.201.164:5000/v1/Planning/ServiceOrder/MasterData',
	headers: {
		'Accept': 'application/json',
	},
});