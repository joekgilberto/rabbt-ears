import axios from 'axios';

const BASE_URL = process.REACT_APP_TVMAZE_API_URL;
const SEARCH_URL = process.REACT_APP_TVMAZE_SEARCH_URL;

export async function rando(id) {
    const randomId = Math.ceil(Math.random()*1000)
    return axios
        .get(`${BASE_URL}${randomId}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
};

export async function show(id) {
    return axios
        .get(`${BASE_URL}${id}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
};

export async function search(query) {
    return axios
        .get(`${SEARCH_URL}${query}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
};