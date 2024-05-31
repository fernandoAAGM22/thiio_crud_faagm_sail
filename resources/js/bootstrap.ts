import axios, { AxiosStatic } from 'axios';

declare global {
    interface Window {
        axios: AxiosStatic;
    }
};

window.axios = axios;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;
// window.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('laravel_session')}`;
