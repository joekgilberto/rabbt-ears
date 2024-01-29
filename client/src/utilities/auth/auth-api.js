import axios from "axios";

const BASE_URL = process.env.REACT_APP_AUTH_API_URL;

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

export async function update(id, data) {
    const config = {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
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