import axios from 'axios';

const BASE_URL = process.env.REACT_APP_TVMAZE_API_URL;
const SEARCH_URL = process.env.REACT_APP_TVMAZE_SEARCH_URL;

export async function show(id) {
    return axios
        .get(`${BASE_URL}${id}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
};

export async function search(query) {
    return axios
        .get(`${SEARCH_URL}${query}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
};