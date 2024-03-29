//Imports custom API calls from tvmaze-api
import * as tvmazeApi from './tvmaze-api';

//Exports function that returns one show based on id
export async function getShow(id) {
    try {
        const data = await tvmazeApi.show(id);
        return data;
    } catch (err) {
        return err;
    }
}

//Exports function that returns a list of random shows (with certain ids excluded)
export async function getRandomShows() {
    try {
        const data = [];
        const used = [];
        const unusable = [0, 17, 36, 85, 113, 119, 121, 135, 173, 223, 264, 381, 389, 441, 442, 596, 606, 608, 639, 640, 642, 715, 723, 724, 783, 784, 820, 852, 853, 876, 893, 925, 927];

        while (data.length < 15) {
            const randomId = Math.floor(Math.random() * 1000) + 1;

            if (used.includes(randomId) || unusable.includes(randomId)) {
                continue;
            } else {
                const res = await tvmazeApi.show(randomId);
                if (res) {
                    data.push(res);
                }
                used.push(randomId);
            };
        };

        return data;
    } catch (err) {
        return err;
    }
}

//Exports function that returns a list of shows based on a query
export async function searchShow(query) {
    try {
        const encodedQuery = encodeURIComponent(query);
        const data = await tvmazeApi.search(encodedQuery);
        return data;
    } catch (err) {
        return err;
    }
}