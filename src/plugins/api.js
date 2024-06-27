import axios from "axios";

const api = axios.create({baseURL: 'http://localhost:8080'});

let load
let loadState = false
api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    if (loadState === true){
        load.hide()
        loadState = false
    }
    return Promise.reject(error);
});
api.interceptors.response.use(function (response) {
    if (response.config.noSpinner !== true ) {
        if (loadState === true){
            load.hide()
            loadState = false
        }
    }
    return response;
}, function (error) {
    if (loadState === true){
        load.hide()
        loadState = false
    }
    return Promise.reject(error);
});
export default api;