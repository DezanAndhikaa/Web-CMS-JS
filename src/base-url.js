import axios from 'axios';

export const Base = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})