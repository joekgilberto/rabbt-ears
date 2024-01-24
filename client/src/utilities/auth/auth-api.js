import axios from "axios";

const BASE_URL = process.env.REACT_APP_AUTH_API_URL;

export async function register(data) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    }
    return axios
        .post(`${BASE_URL}register/`,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function login(data) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    }
    return axios
        .post(`${BASE_URL}login/`,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function logout() {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    }
    
    return axios
        .get(`${BASE_URL}logout/`,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
};

export async function show(id) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    }
    return axios
        .get(`${BASE_URL}${id}/`,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
};

export async function update(id,data) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    }
    return axios
        .put(`${BASE_URL}${id}/`,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};