import axios from 'axios';

const BASE_URL = process.env.REACT_APP_REVIEWS_API_URL;

export async function index() {
    return axios
        .get(BASE_URL)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
};

export async function show(id) {
    return axios
        .get(`${BASE_URL}${id}/`)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
};

export async function associated(id) {
    return axios
        .get(`${BASE_URL}associated/${id}/`)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
};

export async function users(id) {
    return axios
        .get(`${BASE_URL}users/${id}/`)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
};


export async function create(data) {
    const config={
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return axios
        .post(BASE_URL,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function update(id,data) {
    const config={
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return axios
        .put(`${BASE_URL}${id}/`,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function destroy(id) {
    const config={
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return axios
        .delete(`${BASE_URL}${id}/`,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
    
}