//Imports axios for API calls
import axios from 'axios';

//Imports API url from environmental variables
const BASE_URL = process.env.REACT_APP_REVIEWS_API_URL;

//Exports API call for all reviews
export async function index() {
    return axios
        .get(BASE_URL)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
};

//Exports API call for a specific review by id
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

//Exports API call for reviews associated with a show by id
export async function associated(id) {
    return axios
        .get(`${BASE_URL}associated/${id}/`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
};

//Exports API call for reviews associated with a user by id
export async function users(id) {
    return axios
        .get(`${BASE_URL}users/${id}/`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
};


//Exports API call to create a review
export async function create(data) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return axios
        .post(BASE_URL, data, config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });

};

//Exports API call to update a review by id
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

//Exports API call to delete a review by id
export async function destroy(id) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return axios
        .delete(`${BASE_URL}${id}/`, config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });

}