//Imports axios for API calls
import axios from 'axios';

//Imports API urls from environmental variables
const BASE_URL = process.env.REACT_APP_TVMAZE_API_URL;
const SEARCH_URL = process.env.REACT_APP_TVMAZE_SEARCH_URL;

//Exports API call for a specific review by id
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

//Exports API call to query shows using a string
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