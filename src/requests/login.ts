import axios from 'axios';

export const loginViaCabinetRequest = (email: string, password: string) => axios({
  method: 'post',
  url: `${import.meta.env.VITE_APP_API_URL}/api/auth/login_kpi`,
  data: { email, password },
});

export const fetchAzureLoginUrl = () => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/auth/url`,
});

export const loginViaAzureRequest = () => axios({
  method: 'post',
  url: `${import.meta.env.VITE_APP_API_URL}/api/auth/login`,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const logoutRequest = () => axios({
  method: 'post',
  url: `${import.meta.env.VITE_APP_API_URL}/api/auth/logout`,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const refreshRequest = () => axios({
  method: 'post',
  url: `${import.meta.env.VITE_APP_API_URL}/api/auth/refresh`,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
