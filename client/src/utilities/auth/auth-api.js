//Imports axios for API calls
import axios from "axios";

//Imports API url from environmental variables
const BASE_URL = process.env.REACT_APP_AUTH_API_URL;

//Exports register API call
export async function register(data) {
    return axios
        .post(`${BASE_URL}register/`, data)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });

};

//Exports login API call
export async function login(data) {
    return axios
        .post(`${BASE_URL}login/`, data)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });

};

//Exports logout API call
export async function logout() {
    return axios
        .get(`${BASE_URL}logout/`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
};

//Exports API call that shows a user's details
export async function show(id) {
    return axios
        .get(`${BASE_URL}${id}/`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
};

//Exports user update API call
export async function update(id, data) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return axios
        .put(`${BASE_URL}${id}/`, data, config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });

};